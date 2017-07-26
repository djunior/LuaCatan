local Element = require"lua.element"

local function VertexFactory()
    local vertex_count = 0

    local function Vertex(maxEdges)
        vertex_count = vertex_count + 1
        local id = vertex_count
        local maxEdges = maxEdges or 3
        local t = {}
        t.id = id
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
        
        t.getSimpleObject = function ()
            local o = {
                id = id,
                connections = {},
                element = t.element,
            }
            
            for i = 1,#t.edges do
                o.connections[i] = t.edges[i].id
            end

            return o
        end
        
        t.addElement = function(playerId,elementType)
            print("Adding element " .. tostring(elementType) .. " to player " .. tostring(playerId))
            t.element = Element(playerId,elementType)
        end

        return t
    end
    return {produce = Vertex}
end

return VertexFactory