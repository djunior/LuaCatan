local function ResourceTile(tileType, tileNumber, boardTile)
    local t = {}

    t.tileType = tileType
    t.tileNumber = tileNumber.number
    t.tileStars = tileNumber.stars
    t.boardTile = boardTile

    t.hasThief = (tileNumber.number == 0)

    t.getSimpleObject = function()
        return {
            tileType = t.tileType,
            tileNumber = tostring(t.tileNumber),
            tileStars = tostring(t.tileStars),
            hasThief = t.hasThief,
            boardTile = t.boardTile.getSimpleObject(),
        }
    end

    return t
end

return ResourceTile