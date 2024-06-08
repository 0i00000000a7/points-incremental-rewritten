document.addEventListener('keydown', function(e) {  
  if (e.key.match(/^[1-8]$/) && !e.shiftKey) {  
    buyMaxDim(parseInt(e.key));  
  } else if (e.key.match(/^[1-8]$/) && e.shiftKey) {  
    buydim(parseInt(e.key));  
  }  
  if (e.key === "m") {  
    buyall();  
  }  
  if (e.key === "g") {  
    galaxy();  
  }  
  if (e.key === "s") {  
    //square();  
    alert("Coming s∞n!")
  }  
});