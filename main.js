$(document).ready(function () {

    eel.init()();

    $('.text').textillate({
        loop: true,
        sync: true,
        in: {
            effect: "bounceIn",
        },
        out: {
            effect: "bounceOut",
        },
    });

    // Siri wave animation setup
    var siriWave = new SiriWave({
        container: document.getElementById("siri-container"),
        width: 800,
        height: 200,
        style: "ios9",
        amplitude: 1,
        speed: 0.30,
        autostart: true
    });

    // Siri message animation
    $('.siri-message').textillate({
        loop: true,
        sync: true,
        in: {
            effect: "fadeInUp",
            sync: true,
        },
        out: {
            effect: "fadeOutUp",
            sync: true,
        },
    });

    // Mic button click event
    $("#MicBtn").click(function () {
        eel.playAssistantSoundJS();  // ✅ match renamed function
        $("#Oval").attr("hidden", true);
        $("#SiriWave").attr("hidden", false);
        eel.handleCommandFromJS()();  // ✅ match renamed function
    });
    
    

    // Keyboard shortcut for activating assistant
    document.addEventListener('keyup', function (e) {
        if (e.key === 'j' && (e.ctrlKey || e.metaKey)) {
            eel.playAssistantSound();
            $("#Oval").attr("hidden", true);
            $("#SiriWave").attr("hidden", false);
            eel.allCommands()();
        }
    });

    // Function to play assistant based on input
    function PlayAssistant(message) {
        if (message.trim() !== "") {
            $("#Oval").attr("hidden", true);
            $("#SiriWave").attr("hidden", false);
            eel.allCommands(message);
            $("#chatbox").val("");
            $("#MicBtn").attr('hidden', false);
            $("#SendBtn").attr('hidden', true);
        }
    }

    // Show/hide mic and send buttons based on input
    function ShowHideButton(message) {
        if (message.trim().length === 0) {
            $("#MicBtn").attr('hidden', false);
            $("#SendBtn").attr('hidden', true);
        } else {
            $("#MicBtn").attr('hidden', true);
            $("#SendBtn").attr('hidden', false);
        }
    }

    // Input event on chatbox
    $("#chatbox").on("input", function () {
        ShowHideButton($(this).val());
    });

    // Send button click
    $("#SendBtn").click(function () {
        PlayAssistant($("#chatbox").val());
    });

    // Enter key press in chatbox
    $("#chatbox").keypress(function (e) {
        if (e.which === 13) {
            PlayAssistant($(this).val());
        }
    });

});
