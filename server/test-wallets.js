import fetch from 'node-fetch';
import repos from './src/db/repositories.js';
const { cards } = repos;

const BASE_URL = 'http://localhost:3000';

async function testWallets() {
    console.log('--- WALLET TEST START ---');

    // 1. Get a test card ID
    const allCards = await cards.findAll({ take: 1 });
    if (allCards.length === 0) {
        console.error('No cards found to test wallet.');
        process.exit(1);
    }
    const cardId = allCards[0].id;
    console.log(`Testing with Card ID: ${cardId}`);

    // 2. Test Google Wallet Save
    console.log('\n[TEST] Google Wallet Save...');
    try {
        const res = await fetch(`${BASE_URL}/api/wallet/google/save`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cardId })
        });
        const data = await res.json();
        if (res.ok && data.saveUrl) {
            console.log('✅ Google Wallet URL generated:', data.saveUrl.substring(0, 50) + '...');
        } else {
            console.error('❌ Google Wallet Failed:', data);
        }
    } catch (e) {
        console.error('❌ Google Wallet Error:', e.message);
    }

    // 3. Test Apple Wallet Pass
    console.log('\n[TEST] Apple Wallet Pass...');
    try {
        const res = await fetch(`${BASE_URL}/api/wallet/apple/${cardId}`);
        if (res.ok && res.headers.get('content-type') === 'application/vnd.apple.pkpass') {
            const buffer = await res.buffer();
            console.log(`✅ Apple Pass generated (${buffer.length} bytes)`);
        } else {
            console.error('❌ Apple Wallet Failed:', res.status, res.statusText);
            const text = await res.text();
            console.error('Response:', text);
        }
    } catch (e) {
        console.error('❌ Apple Wallet Error:', e.message);
    }

    console.log('\n--- WALLET TEST END ---');
    process.exit(0);
}

testWallets();
