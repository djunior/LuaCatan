local vertex_count = 0

local function Vertex(maxEdges)
    vertex_count = vertex_count + 1
    local id = vertex_count
    local maxEdges = maxEdges or 3
    local t = {}
    t.edges = {}
    t.maxEdges = maxEdges
    t.notifyConnection = function(v)
        if #t.edges == t.maxEdges then
            return false
        end

        if t.edges[v] then
            return false
        end

        table.insert(t.edges,v)
        t.edges[v] = #t.edges

        return true
    end
    t.connectTo = function(v)
        if t.notifyConnection(v) then
            v.notifyConnection(t)
        end
    end
    t.tostring = function() return "Vertex@" .. tostring(id) .. "{ numberOfEdges = " .. tostring(#t.edges) .. " }" end

    return t
end

return Vertex