import repos from './src/db/repositories.js';
const { admins, products } = repos;

async function test() {
    console.log('--- TEST START ---');
    try {
        const adminCount = await admins.count(); // Assuming count method exists or we use prisma directly
        console.log(`Admins found: ${adminCount}`);

        const allProducts = await products.findAll({ take: 5 });
        console.log(`Products found: ${allProducts.length}`);
        if (allProducts.length > 0) {
            console.log('First product:', allProducts[0].name);
        }

        console.log('--- TEST SUCCESS ---');
        process.exit(0);
    } catch (error) {
        console.error('TEST FAILED:', error);
        process.exit(1);
    }
}

test();
