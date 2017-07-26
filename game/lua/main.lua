local Board = require "lua/board"

local function Game()
    local t = {}
    local board = Board(3)
    local players = 1

    t.getTiles = function () return board.getTiles() end
    
    function t.addPlayer () 
        players = players + 1
        return players
    end

    function t.addElement(...)
        return board.addElement(...)
    end

    return t,players
end

return Game

