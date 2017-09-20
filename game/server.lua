local ev = require'ev'
local json = require'json'

local Game = dofile("lua/main.lua")

local currentGame = nil

local player_socket = {}

local function parseRequest(socketWrapper,obj)
    local message = {id = obj.id}    
    local handler = {
        newGame = function ()
            message.response = {}
            if currentGame then
                print("There is a game already!")
                message.response.gameSession = 1
                message.response.playerId = currentGame.addPlayer(socketWrapper)
                message.conversionTable = currentGame.getConversionTable()
            else
                print("Creating new game")
                message.response.gameSession = 1
                currentGame,message.response.playerId = Game(socketWrapper)
                message.conversionTable = currentGame.getConversionTable()

                print("Returning player id:",message.response.playerId)
            end
        end,

        getBoard = function ()
            message.response = currentGame.getTiles()
        end,

        addElement = function (params)
            currentGame.addElement(params.playerId,params.vertexId,params.elementType)
            message.response = "ok"
        end,

        addRoad = function (params)
            currentGame.addRoad(params.playerId,params.vertexFromId,params.vertexToId)
            message.response = "ok"
        end,

        rollDice = function(params)
            message.response = currentGame.rollDice(params.playerId)
        end,
    }
    handler[obj.request](obj.body)
    return message
end

local server = require'websocket'.server.ev.listen
{
  port = 35465,
  
  -- the protocols field holds
  --   key: protocol name
  --   value: callback on new connection
  protocols = {
    -- this callback is called, whenever a new client connects.
    -- ws is a new websocket instance
    luacatan = function(ws)
        print("New websocket opened")
        ws:on_message(function(ws,message)
            print("Received message " .. message)
            local obj = json.decode(message)

            local socketWrapper = {
                send = function (msg)
                    local str = json.encode(msg)
                    print("Sending message " .. str)
                    ws:send(str)
                end
            }

            local response = parseRequest(socketWrapper,obj)
            ws:send(json.encode(response))
        end)

        -- this is optional
        ws:on_close(function()
            ws:close()
        end)
    end
  }
}

-- use the lua-ev loop
ev.Loop.default:loop()