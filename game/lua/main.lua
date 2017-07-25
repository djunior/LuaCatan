local Board = require "lua/board"

local function Game()
    local t = {}
    local board = Board(3)
    t.getTiles = function () return board.getTiles() end
    return t
end

return Game

