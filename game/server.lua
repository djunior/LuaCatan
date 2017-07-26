local ev = require'ev'
local json = require'json'

local Game = dofile("lua/main.lua")

local currentGame = nil

local function parseRequest(obj)
    local message = {id = obj.id}    
    local handler = {
        newGame = function ()
            message.response = {}
            if currentGame then
                print("There is a game already!")
                message.response.gameSession = 1
                message.response.playerId = currentGame.addPlayer()
            else
                print("Creating new game")
                message.response.gameSession = 1
                local playerId
                currentGame,message.response.playerId = Game()

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
        ws:on_message(function(ws,message)
            print("Received message " .. message)
            local obj = json.decode(message)
            local response = parseRequest(obj)
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