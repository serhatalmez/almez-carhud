Citizen.CreateThread(function()
    isbelt = false
    iscruise = false 
    while true do
        local player = PlayerPedId()
        if IsPedInAnyVehicle(player, true) then
            Citizen.Wait(50)
            local vehicle = GetVehiclePedIsIn(player, false)
            local FuelLevel = GetVehicleFuelLevel(vehicle)
            dooropened = false
            for i = 0, 3 do
                local doorsangle = GetVehicleDoorAngleRatio(vehicle, i)
                if doorsangle ~= 0.0 then
                    dooropened = true
                end
            end
            trunkopened = false 
            local trunkangle = GetVehicleDoorAngleRatio(vehicle, 5)
                if trunkangle ~= 0.0 then
                    trunkopened = true
                end
            local retval, lights, highbeams = GetVehicleLightsState(vehicle) 
            lightsopened = false 
            if lights ~= 0 then
                lightsopened = true                
            end
            if highbeams ~= 0 then
                lightsopened = true
            end
            if IsControlJustReleased(0, 311) then
                if not isbelt then
                    isbelt = true
                else
                    isbelt = false
                end
            end
            if IsControlJustReleased(0, 166) then
                if not iscruise then
                    iscruise = true
                else
                    iscruise = false
                end
            end
            SendNUIMessage({
                type = "carHud",
                fuel = FuelLevel,
                doors = dooropened,
                light = lightsopened,
                belt = isbelt,
                engine = GetIsVehicleEngineRunning(vehicle),
                trunk = trunkopened,
                cruise = iscruise
            })
            SendNUIMessage({
                type = "vehSpeed",
                speed = math.floor((tonumber(GetEntitySpeed(vehicle))) * 3.6)
            })
            SendNUIMessage({
                type = "inVeh",
                data = "open"
            })
        else
            Citizen.Wait(1)
            SendNUIMessage({
                type = "inVeh",
                data = "close"
            })
        end
    end
end)
