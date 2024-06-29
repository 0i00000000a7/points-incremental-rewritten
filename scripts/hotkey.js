hotkeys("*", function(event) {
  event.preventDefault()
  if (!player.options.hotkey) return
})
hotkeys("1,2,3,4,5,6,7,8", function(event, handler) {
  event.preventDefault()
  if (!player.options.hotkey) return
  buyMaxDim(parseInt(handler.key));  
});
hotkeys("shift+1,shift+2,shift+3,shift+4,shift+5,shift+6,shift+7,shift+8", function(event, handler) {
  event.preventDefault()
  if (!player.options.hotkey) return
  buydim(parseInt(handler.key.replace("shift+","")))
});
hotkeys("m", function(event, handler) {
  event.preventDefault()
  if (!player.options.hotkey) return
  buyall()
})
hotkeys("g", function(event, handler) {
  event.preventDefault()
  if (!player.options.hotkey) return
  galaxy()
})
hotkeys("s", function(event, handler) {
  event.preventDefault()
  if (!player.options.hotkey) return
  square()
})