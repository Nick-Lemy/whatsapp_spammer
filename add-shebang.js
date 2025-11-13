import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'app.js');
const content = fs.readFileSync(filePath, 'utf8');

if (!content.startsWith('#!/usr/bin/env node')) {
    const newContent = '#!/usr/bin/env node\n' + content;
    fs.writeFileSync(filePath, newContent, 'utf8');
    fs.chmodSync(filePath, '755');
    console.log('✓ Shebang added to app.js');
} else {
    console.log('✓ Shebang already present in app.js');
}