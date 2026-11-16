const { chromium } = require('playwright'); const path=require('path');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1549,height:1015}});
await p.goto('file://'+path.resolve(__dirname,'render-blog-art.html'));await p.waitForTimeout(800);
await p.locator('#s').screenshot({path:process.argv[2]});await b.close();})();
