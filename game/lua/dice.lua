local RNG = require"lua.rng"

local function Dice(sides)
    local t = {}

    t.roll = function ()
        return RNG.getRandomNumber(sides)
    end

    return t
end

return Dice