const cont= require('./src/contenedor');
const { optionsMySQL } = require('./src/DB/optionsMySQL');
const container= new cont(optionsMySQL,'products')

const prods=[
        {name:'Raqueta Wilson ProStaff 97', price:'50000', thumbnail:'img.img' },
        {name:'Raqueta Head Speed MP', price:'43000', thumbnail:'img.img' },
        {name:'Raqueta Babolat PureDrive', price:'52000', thumbnail:'img.img' }
      ];

      {
          prods.forEach(prod=>container.save(prod))
      }