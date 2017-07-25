local ev = require'ev'
local json = require'json'

local Game = dofile("lua/main.lua")

local currentGame = Game()

local function parseRequest(obj)
    local response = {id = obj.id}    
    local handler = {
        newGame = function ()
            response.response = "ok"
            currentGame = Game()
        end,

        getBoard = function ()
            response.response = currentGame.getTiles()
        end
    }
    handler[obj.request]()
    return response
end

local server = require'websocket'.server.ev.listen
{
  -- listen on port 8080
  port = 1337,
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