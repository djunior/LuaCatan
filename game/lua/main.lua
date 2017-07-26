local Board = require "lua/board"

local function PlayerFactory(maxPlayers)
    local playerCount = 0
    local maxPlayers = maxPlayers or 4

    local function Player (socket)
        playerCount = playerCount + 1
        local t = {
            id = playerCount,
            socket = socket
        }
        return t
    end

    return {produce = Player}
end

local function Game(ws)
    local t = {}
    local board = Board(3)
    local PFactory = PlayerFactory(4)
    local players = {PFactory.produce(ws)}

    t.getTiles = function () return board.getTiles() end
    
    function t.addPlayer (socket) 
        table.insert(players,PFactory.produce(socket))
        return players[#players].id
    end

    function t.addElement(playerId, vertexId, elementType)
        board.addElement(playerId, vertexId, elementType)

        for i = 1,#players do
            if players[i].id ~= playerId then
                players[i].socket.send({
                    command = "addElement",
                    playerId = playerId,
                    vertexId = vertexId,
                    elementType = elementType,
                })
            end
        end
    end

    return t,players[1].id
end

return Game

