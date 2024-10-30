const clients = [{
    id: 1,
    taxNumber: '86620855',
    name: 'HECTOR ACUÑA BOLAÑOS'
},
{
    id: 2,
    taxNumber: '7317855K',
    name: 'JESUS RODRIGUEZ ALVAREZ'
},
{
    id: 3,
    taxNumber: '73826497',
    name: 'ANDRES NADAL MOLINA'
},
{
    id: 4,
    taxNumber: '88587715',
    name: 'SALVADOR ARNEDO MANRIQUEZ'
},
{
    id: 5,
    taxNumber: '94020190',
    name: 'VICTOR MANUEL ROJAS LUCAS'
},
{
    id: 6,
    taxNumber: '99804238',
    name: 'MOHAMED FERRE SAMPER'
}
];
const accounts = [{
    clientId: 6,
    bankId: 1,
    balance: 15000
},
{
    clientId: 1,
    bankId: 3,
    balance: 18000
},
{
    clientId: 5,
    bankId: 3,
    balance: 135000
},
{
    clientId: 2,
    bankId: 2,
    balance: 5600
},
{
    clientId: 3,
    bankId: 1,
    balance: 23000
},
{
    clientId: 5,
    bankId: 2,
    balance: 15000
},
{
    clientId: 3,
    bankId: 3,
    balance: 45900
},
{
    clientId: 2,
    bankId: 3,
    balance: 19000
},
{
    clientId: 4,
    bankId: 3,
    balance: 51000
},
{
    clientId: 5,
    bankId: 1,
    balance: 89000
},
{
    clientId: 1,
    bankId: 2,
    balance: 1600
},
{
    clientId: 5,
    bankId: 3,
    balance: 37500
},
{
    clientId: 6,
    bankId: 1,
    balance: 19200
},
{
    clientId: 2,
    bankId: 3,
    balance: 10000
},
{
    clientId: 3,
    bankId: 2,
    balance: 5400
},
{
    clientId: 3,
    bankId: 1,
    balance: 9000
},
{
    clientId: 4,
    bankId: 3,
    balance: 13500
},
{
    clientId: 2,
    bankId: 1,
    balance: 38200
},
{
    clientId: 5,
    bankId: 2,
    balance: 17000
},
{
    clientId: 1,
    bankId: 3,
    balance: 1000
},
{
    clientId: 5,
    bankId: 2,
    balance: 600
},
{
    clientId: 6,
    bankId: 1,
    balance: 16200
},
{
    clientId: 2,
    bankId: 2,
    balance: 10000
}
]
const banks = [{
    id: 1,
    name: 'SANTANDER'
},
{
    id: 2,
    name: 'CHILE'
},
{
    id: 3,
    name: 'ESTADO'
}
];
// 0 PROBLEMA
const clientIds = clients.map (client => client.id);
console.log('Pregunta 0');
console.log (clientIds)

// 1 PROBLEMA

const listClientsIds = () => {
    return clients
        .slice() 
        .sort((a, b) => a.taxNumber.localeCompare(b.taxNumber)) 
        .map(client => client.id); 
};

console.log('Pregunta 1');
console.log(listClientsIds());


// 2 PROBLEMA


const listClientsNamesByTotalBalance = () => {
    
    const totalBalances = {};

    
    accounts.forEach(account => {
        if (totalBalances[account.clientId]) {
            totalBalances[account.clientId] += account.balance;
        } else {
            totalBalances[account.clientId] = account.balance;
        }
    });

    
    return clients
        .map(client => ({
            name: client.name,
            totalBalance: totalBalances[client.id] || 0 
        }))
        .sort((a, b) => b.totalBalance - a.totalBalance) 
        .map(client => client.name); 
};

console.log('Pregunta 2');
console.log(listClientsNamesByTotalBalance());

// 3 PROBLEMA

const banksClientsTaxNumbers = () => {
    const result = {}; 

    
    banks.forEach(bank => {
    
        const clientsInBank = accounts
            .filter(account => account.bankId === bank.id)
            .map(account => {
                
                const client = clients.find(c => c.id === account.clientId);
                return {
                    taxNumber: client.taxNumber,
                    name: client.name
                };
            });

        
        clientsInBank.sort((a, b) => a.name.localeCompare(b.name));

        
        result[bank.name] = clientsInBank.map(client => client.taxNumber);
    });

    return result;
};

console.log('Pregunta 3');
console.log(banksClientsTaxNumbers());

// 4 PROBLEMA

const richClientsBalances = () => {
  
    const santanderId = banks.find(bank => bank.name === 'SANTANDER').id;
    
    return accounts
        .filter(account => account.bankId === santanderId && account.balance > 25000)
        .map(account => account.balance) 
        .sort((a, b) => b - a); 
};

console.log('Pregunta 4');
console.log(richClientsBalances());


// 5 PROBLEMA

const banksRankingByTotalBalance = () => {
    const bankTotals = {}; 

    
    accounts.forEach(account => {
        if (bankTotals[account.bankId]) {
            bankTotals[account.bankId] += account.balance;
        } else {
            bankTotals[account.bankId] = account.balance;
        }
    });

    
    const ranking = Object.keys(bankTotals).map(bankId => ({
        bankId: parseInt(bankId), 
        totalBalance: bankTotals[bankId]
    }));

    
    ranking.sort((a, b) => a.totalBalance - b.totalBalance);

   
    return ranking.map(item => item.bankId);
};

console.log('Pregunta 5');
console.log(banksRankingByTotalBalance());

//PREGUNTA 6

const banksFidelity = () => {
    const bankClients = {}; 
    
    banks.forEach(bank => {
        bankClients[bank.name] = new Set(); 
    });

    
    accounts.forEach(account => {
        const bankName = banks.find(bank => bank.id === account.bankId).name;
        bankClients[bankName].add(account.clientId);
    });

    
    const result = {};
    
    for (const bank of banks) {
        const clients = bankClients[bank.name];
        const onlyThisBankClients = [...clients].filter(clientId => 
            accounts.filter(acc => acc.clientId === clientId).length ===
            accounts.filter(acc => acc.clientId === clientId && acc.bankId === bank.id).length
        );

        result[bank.name] = onlyThisBankClients.length;
    }

    return result;
};


console.log('Pregunta 6');
console.log(banksFidelity());


// 7 PREGUNTA

const banksPoorClients = () => {
    const result = {}; 

    
    banks.forEach(bank => {
        result[bank.name] = { clientId: null, minBalance: Infinity }; 
    });

    
    accounts.forEach(account => {
        const bankName = banks.find(bank => bank.id === account.bankId).name;

        
        if (account.balance < result[bankName].minBalance) {
            result[bankName].minBalance = account.balance; 
            result[bankName].clientId = account.clientId; 
        }
    });

    
    for (const bankName in result) {
        result[bankName] = result[bankName].clientId;
    }

    return result;
};


console.log('Pregunta 7');
console.log(banksPoorClients());


// 8 PREGUNTA


const newClientRanking = () => {
    
    const newClient = {
        id: clients.length + 1, 
        taxNumber: '12345678K',
        name: 'Pepito flores'
    };

    
    clients.push(newClient);

    
    const newAccount = {
        clientId: newClient.id,
        bankId: 3, 
        balance: 9000
    };
    
    accounts.push(newAccount);

    
    const listClientsNamesByTotalBalance = () => {
        const totalBalances = {};
        
        accounts.forEach(account => {
            if (totalBalances[account.clientId]) {
                totalBalances[account.clientId] += account.balance;
            } else {
                totalBalances[account.clientId] = account.balance;
            }
        });

        return clients
            .map(client => ({
                name: client.name,
                totalBalance: totalBalances[client.id] || 0
            }))
            .sort((a, b) => b.totalBalance - a.totalBalance)
            .map(client => client.name);
    };

    const ranking = listClientsNamesByTotalBalance();
    
    
    return ranking.indexOf(newClient.name) + 1; 
};


console.log('Pregunta 8');
console.log(newClientRanking());
