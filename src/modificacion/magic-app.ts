import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { builder } from './builder.js';
import net from 'net';

const client = net.connect({port: 3000});

yargs(hideBin(process.argv))
    .command('add', 'Adds a card to the collection', { 
      builder,
      handler: (argv) => {
        const data = JSON.stringify({ action: 'add', card: argv, user: argv.user, close: 'CLOSED' });
        client.write(data);
      }
    })
    .command('update', 'Updates a card in the collection', {
      builder,
      handler: (argv) => {
        const data = JSON.stringify({ action: 'update', card: argv, user: argv.user, close: 'CLOSED' });
        client.write(data);
      }
    })
    .command('remove', 'Removes a card from the collection', {
        user : {
          describe: 'Username',
          type: 'string',
          demandOption: true
        },
        id : {
          describe: 'Card ID',
          type: 'number',
          demandOption: true
        }
      },
      (argv) => {
        const data = JSON.stringify({ action: 'remove', card: argv, user: argv.user, close: 'CLOSED' });
        client.write(data);
      }
    )
    .command('list', 'Lists all cards in the collection', {
        user : {
          describe: 'Username',
          type: 'string',
          demandOption: true
        }
      },
      (argv) => {
        const data = JSON.stringify({ action: 'list', card: argv, user: argv.user, close: 'CLOSED' });
        client.write(data);
      }
    )
    .command('read', 'Shows information of a specific card', {
      user : {
        describe: 'Username',
        type: 'string',
        demandOption: true
      },
      id : {
        describe: 'Card ID',
        type: 'number',
        demandOption: true
      }
      },
      (argv) => {
        const data = JSON.stringify({ action: 'read', card: argv, user: argv.user, close: 'CLOSED' });
        client.write(data);
      }
    )
    .help()
    .argv;

    client.on('error', (err) => {
      console.error('Error de conexión con el servidor:', err);
    });
    
    let wholeData = '';
    client.on('data', (dataChunk) => {
      wholeData += dataChunk;
    });
    client.on('end', () => {
      console.log('Received from server:\n', wholeData.toString());
    });
    client.on('close', () => {
      console.log('Connection closed');
    });