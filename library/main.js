let phoneOpen = false
let updatedCashCount = 0

window.addEventListener('message', (event) => {
    if (event.data.type == "carHud") {
        $(".fuel-bar-inside").css("width", event.data.fuel+"%")
        carHudMiniIconOnOff("doors", event.data.doors)
        carHudMiniIconOnOff("engine", event.data.engine)
        carHudMiniIconOnOff("light", event.data.light)
        carHudMiniIconOnOff("belt", event.data.belt)
        carHudMiniIconOnOff("trunk", event.data.trunk)
        carHudMiniIconOnOff("cruise", event.data.cruise)
        if (event.data.seatbeltmod) {
            $("#beltColor path").css("fill", "orange")
        } else {
            $("#beltColor path").css("fill", "white")
        }
        if (event.data.engineHealth < 500) {
            $("#engineColor path").css("fill", "orange")
        } else {
            $("#engineColor path").css("fill", "white")
        }
    } else if (event.data.type == "vehSpeed") {
        $(".kmh-number").html(event.data.speed)
        var speedcheck = event.data.speed - 180;
        $(".strela").css("transform", "rotate("+speedcheck+"deg)")
    } else if (event.data.type == "inVeh") {
        if (event.data.data == "open") {
        $(".car-hud").css("display", "flex")
        } else if (event.data.data == "close") {
        $(".car-hud").css("display", "none")
        }
    }
});


function carHudMiniIconOnOff(style, on) {
    if (on == "close") {
        $("#"+style).css("display", "none")
        $("#"+style+"-icon").css("display", "none")
    } else if (!on) {
        $("#"+style).css("display", "none")
        $("#"+style+"-icon").css("display", "block")
        $("#"+style+"-icon").css("opacity", "0.45")
    } else {
        $("#"+style).css("display", "block")
        $("#"+style+"-icon").css("display", "block")
        $("#"+style+"-icon").css("opacity", "1.0")
    }
}

// Hud Menu
$(".hud-menu-header-close").click(function() {
    $(".hud-menu-container").css("display", "none");
    $.post('https://tgiann-hudv2/hudmenuclose');
});

$("#emotechat").on( "click", function(e) {
    $.post('https://tgiann-hudv2/emotechat', JSON.stringify({onOff: e.currentTarget.checked}) );
});

$("#blackbar").on( "click", function(e) {
    if (e.currentTarget.checked) {
        $(".blackbar-container").css("display", "flex")
    } else {
        $(".blackbar-container").css("display", "none")
    };
});