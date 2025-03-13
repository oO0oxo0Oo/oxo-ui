export default function () {
  if (PROD) {
    const logo = `
________________________________________________________
                                               .__ 
      ____   ___  ___   ____            __ __  |__|
     /  _ \  \  \/  /  /  _ \   ______ |  |  \ |  |
    (  <_> )  >    <  (  <_> ) /_____/ |  |  / |  |
     \____/  /__/\_ \  \____/          |____/  |__|
                   \/                               
________________________________________________________
                  author:oO0oxo0Oo
`;

    const rainbowGradient = `
background: linear-gradient(135deg, orange 60%, cyan);
background-clip: text;
color: transparent;
font-size: 13px; 
line-height: 1;
font-family: monospace;
font-weight: 400;
`;

    console.info(`%c${logo}`, rainbowGradient);
  } else if (DEV) {
    console.log("[EricUI]:dev mode...");
  }
}
