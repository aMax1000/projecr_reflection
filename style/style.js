let light = document.getElementById("light");
let dark = document.getElementById("dark");

light.addEventListener("change", function(){
    document.documentElement.style.setProperty('--glass-bg', 'rgba(0, 0, 0, 1)');
} );

dark.addEventListener("change", function(){
    //
} );