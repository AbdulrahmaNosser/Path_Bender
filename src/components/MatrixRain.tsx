import React, { useEffect, useRef } from 'react';


const drop_time = 75;

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix characters
    const matrix = "MЇЉЊЋЌЍЎЏБГДЖИЙЛПФЦЧШЩЪЫЭЮЯвджзийклмнптфцчшщъыьэюяѐёђѓєїљњћќѝўџѢѣѧѮѱѲѳҋҌҍҎҏҐґҒғҔҕҖҗҘҙҚқҝҟҡҢңҤҥҩҪҫҬҭҰұҲҳҵҷҹҺҿӁӂӃӄӆӇӈӊӋӌӎӐӑӒӓӔӕӖӗӘәӚӛӜӝӞӟӡӢӣӤӥӦӧӨөӪӫӬӭӮӯӰӱӲӳӴӵӶӷӸӹӺӽӿԀԍԏԐԑԓԚԟԦԧϤϥϫϭｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝⲁⲂⲃⲄΓΔΘΛΞΠЀЁЂЃЄⲉⲊⲋⲌⲍⲏⲑⲓⲕⲗⲙⲛⲜⲝⲡⲧⲩⲫⲭⲯⳁⳈⳉⳋⳤ⳥⳦⳨⳩∀∁∂∃∄∅∆∇∈∉∊∋∌∍∎∏∐∑∓ℇℏ℥Ⅎℷ⩫⨀⨅⨆⨉⨍⨎⨏⨐⨑⨒⨓⨔⨕⨖⨗⨘⨙⨚⨛⨜⨝⨿⩪";
    const matrixArray = matrix.split("");

    const font_size = 25;
    const columns = canvas.width / font_size;

    const drops: number[] = [];
    const characterGlows: Array<{y: number, intensity: number, age: number}[]> = []; // Track glow for each character in each column
    
    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
      characterGlows[x] = []; // Initialize empty glow array for each column
    }

    function drawGlowText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, intensity: number = 1) {
      ctx.fillStyle = "#00FF41";

      // Calculate glow intensity based on distance from leading character
      const glowIntensity = Math.max(0, intensity);

      if (glowIntensity > 0) {
        // Outer faint glow
        ctx.shadowColor = `rgba(0, 255, 65, ${0.5 * glowIntensity})`;
        ctx.shadowBlur = 40 * glowIntensity;
        ctx.fillText(text, x, y);

        // Mid glow
        ctx.shadowColor = `rgba(0, 255, 65, ${1 * glowIntensity})`;
        ctx.shadowBlur = 20 * glowIntensity;
        ctx.fillText(text, x, y);

        // Inner bright glow
        ctx.shadowColor = `rgba(255, 255, 255, ${1 * glowIntensity})`;
        ctx.shadowBlur = 10 * glowIntensity;
        ctx.fillText(text, x, y);
      }

      // Finally the sharp text (no shadow)
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
      ctx.fillText(text, x, y);
    }

    function draw() {
      if (!ctx || !canvas) return;
      
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = font_size + "px courier";

      for (let i = 0; i < drops.length; i++) {
        const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
        const currentY = drops[i] * font_size;
        
        // Add new glow for the current character (most recent = full intensity)
        characterGlows[i].push({
          y: currentY,
          intensity: 1.0,
          age: 0
        });
        
        // Age and fade existing glows
        characterGlows[i] = characterGlows[i].map(glow => ({
          ...glow,
          age: glow.age + 1,
          intensity: Math.max(0, glow.intensity - 0.02) // Fade by 2% per frame
        })).filter(glow => glow.intensity > 0.01); // Remove very dim glows
        
        // Draw all characters with their individual glows
        let hasGlow = false;
        for (const glow of characterGlows[i]) {
          if (Math.abs(glow.y - currentY) < font_size / 2) { // If this glow is for current character
            if (glow.intensity > 0.1) {
              drawGlowText(ctx, text, i * font_size, currentY, glow.intensity);
              hasGlow = true;
            }
            break;
          }
        }
        
        // If no glow, draw regular character
        if (!hasGlow) {
          ctx.fillStyle = "#00FF41";
          ctx.shadowColor = "transparent";
          ctx.shadowBlur = 0;
          ctx.fillText(text, i * font_size, currentY);
        }
        
        // Reset column when it reaches bottom
        if (currentY > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
          characterGlows[i] = []; // Clear all glows for this column
        }

        drops[i]++;
      }
    }

    const interval = setInterval(draw, drop_time);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1, opacity: 0.4 }}
    />
  );
}