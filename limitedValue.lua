local function LimitedValue(v,l)
    local t = {
        uses = 0,
        value = v,
        limit = l,
    }
    t.tostring = function() return "LimitedValue@" .. tostring(t):gsub("table: ","") end
    return t
end

return LimitedValue