import React, { useEffect, useRef } from 'react';


const drop_time = 90;
const font_size = 25;
const col_life = 0.1;
const rain_opacity = 0.5;

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

    const columns = canvas.width / font_size;

    const drops: number[] = [];
    const characterAges: Array<{y: number, age: number, text: string}[]> = []; // Track age and text of each character in each column
    
    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
      characterAges[x] = []; // Initialize empty age array for each column
    }

    function drawGlowText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, age: number = 0) {
      
      if (age === 0) {
        // Age 0: Just drawn - use pure white glow
        ctx.fillStyle = "#FFFFFF";
        // Outer glow
        ctx.shadowColor = "rgba(255, 255, 255, 1)";
        ctx.shadowBlur = 40;
        ctx.fillText(text, x, y);

        // Mid glow
        ctx.shadowColor = "rgba(255, 255, 255, 1)";
        ctx.shadowBlur = 20;
        ctx.fillText(text, x, y);

        // Inner glow
        ctx.shadowColor = "rgba(255, 255, 255, 1)";
        ctx.shadowBlur = 15;
        ctx.fillText(text, x, y);

        // Inner glow
        ctx.shadowColor = "rgba(255, 255, 255, 1)";
        ctx.shadowBlur = 10;
        ctx.fillText(text, x, y);

        // Inner glow
        ctx.shadowColor = "rgba(255, 255, 255, 1)";
        ctx.shadowBlur = 5;
        ctx.fillText(text, x, y);
      } else if (age <= 5) {
        // Age 1-5: Green-to-white transition glow
        ctx.fillStyle = "#00FF41";
        const intensity = Math.max(0, 1 - (age / 5)); // Fade from 1 to 0 over 5 ages
        
        // Outer faint glow
        ctx.shadowColor = `rgba(0, 255, 65, ${0.5 * intensity})`;
        ctx.shadowBlur = 40 * intensity;
        ctx.fillText(text, x, y);

        // Mid glow
        ctx.shadowColor = `rgba(0, 255, 65, ${1 * intensity})`;
        ctx.shadowBlur = 20 * intensity;
        ctx.fillText(text, x, y);

        // Inner bright glow
        ctx.shadowColor = `rgba(255, 255, 255, ${1 * intensity})`;
        ctx.shadowBlur = 10 * intensity;
        ctx.fillText(text, x, y);
      }

      // Finally the sharp text (no shadow)
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
      ctx.fillText(text, x, y);
    }

    function draw() {
      if (!ctx || !canvas) return;
      
      // Clear the entire canvas
      ctx.fillStyle = "rgba(0, 0, 0, " + col_life + ")";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = font_size + "px courier";

      for (let i = 0; i < drops.length; i++) {
        const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
        const currentY = drops[i] * font_size;
        
        // Age all existing characters first (increment their age)
        characterAges[i] = characterAges[i].map(char => ({
          ...char,
          age: char.age + 1
        })).filter(char => char.age <= 5); // Remove characters older than 5
        
        // Add new character with age 0 (just drawn)
        characterAges[i].push({
          y: currentY,
          age: 0,
          text: text
        });
        
        // Reset column when it reaches bottom
        if (currentY > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
          characterAges[i] = []; // Clear all characters for this column
        }

        drops[i]++;
      }
      
      // Draw all characters after processing all columns
      for (let i = 0; i < drops.length; i++) {
        for (const char of characterAges[i]) {
          if (char.age <= 5) {
            drawGlowText(ctx, char.text, i * font_size, char.y, char.age);
          } else {
            // Regular character without glow
            ctx.fillStyle = "#00FF41";
            ctx.shadowColor = "transparent";
            ctx.shadowBlur = 0;
            ctx.fillText(char.text, i * font_size, char.y);
          }
        }
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
      style={{ zIndex: 1, opacity: rain_opacity }}
    />
  );
}
