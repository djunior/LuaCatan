local function ResourceTile(tileType, tileNumber, boardTile)
    local t = {}

    t.tileType = tileType
    t.tileNumber = t.tileNumber
    t.boardTile = boardTile

    t.hasThief = false

    return t
end

return ResourceTile