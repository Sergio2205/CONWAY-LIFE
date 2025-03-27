Quadrille.CELL_LENGTH = 15;
let seed, q, a, viva;
lifes = 0
let t = 50;
let button;
let contador = 0;
let val;
let q_lifes;

function setup() {
  //Planteo del mapa
  q = createQuadrille(t, t)
  viva = color("rgb(255,255,255)")
  createCanvas(q.width * Quadrille.CELL_LENGTH + 100, q.height * Quadrille.CELL_LENGTH + 100);
  background(200);
  
  //Slider para cambiar framrate
  slider = createSlider(1, 50, 5, 0);
  slider.position(0 , q.height * Quadrille.CELL_LENGTH);
  slider.style('width', '80px');
  frameRate(1)
  
  
  //Boton de aleatoriedad
  button = createButton('Aleatorio');
  button.position(100, q.height * Quadrille.CELL_LENGTH);
  button.mousePressed(seed_random)
  
  //Contador de generaciones
  q_lifes = createQuadrille('1')
  Quadrille.OUTLINE_WEIGHT = 0;
  
  //Selector de formas
  textAlign(CENTER);
  background(200);
  sel = createSelect();
  sel.position(0, q.height * Quadrille.CELL_LENGTH + 100);
  sel.option('block', 1);
  sel.option('bee-hive', 2);
  sel.option('Loaf', 3);
  sel.option('Boat', 4);
  sel.option('Tub', 5);
  sel.option('Blinker', 6);
  sel.option('Toad', 7);
  sel.option('Bacon', 8);
  sel.option('Glider',9);
  sel.option('Spaceship',10);
  sel.selected('block', 1);
  
  //Reset
  button_reset = createButton('Reset');
  button_reset.position(180, q.height * Quadrille.CELL_LENGTH);
  button_reset.mousePressed(reset)
  
}

function draw() {
  //Planteo del mapa
  background("rgb(7,7,7)");
  a = q.clone();
  visitQuadrille(q, updateCell);
  q = a;
  drawQuadrille(q);
  
  //Contador de generaciones
  let params = {
    x: 50, 
    y: q.height * Quadrille.CELL_LENGTH + 20
  }
  drawQuadrille(q_lifes, params)
  lifes += 1
  update_lifes()
  
  //Cambio de framrate
  val = slider.value();
  frameRate(val)

}

function updateCell(row, col){
  if(q.isFilled(row, col)){
    if(q.ring(row, col).order - 1 < 2 || q.ring(row, col).order - 1 > 3){
      a.clear(row, col);
    }
  }
  else{
    if(q.ring(row, col).order === 3){
      a.fill(row, col, viva);
    }
  }
}

/*
block 2, 15
Bee-hive 4, 1686
Loaf 4, 26962
Boat 3, 426
Tub 3, 170
Blinker 1, 7
Toad 4, 10644
Beacon 4, 51219
Glider 3, 107
spaship 5, 424806
*/

function seed_creator (x, y){
  patron = parseInt(sel.value())
  switch (patron){
    case 1: //bloque
      ancho = 2;
      decimal = 15;
      break
    case 2: //bee-hive
      ancho = 4;
      decimal = 1686;
      break
    case 3:
      ancho = 4;
      decimal = 26962;
      break
    case (4):
      ancho = 3;
      decimal = 426;
      break
    case (5):
      ancho = 3;
      decimal = 170;
      break
    case (6):
      ancho = 1;
      decimal = 7;
      break
    case 7:
      ancho = 4;
      decimal = 10644;
      break
    case 8:
      ancho = 4;
      decimal = 51219;
      break
    case (9):
      ancho = 3;
      decimal = 107;
      break
    case (10):
      ancho = 5;
      decimal = 424806;
      break
  }
  seed = createQuadrille(ancho, decimal, viva);
  q = Quadrille.or(q, seed, y , x) //no se pone en la posicion inicial correcta. revisar numero de filas de la seed
  }
  
  
  
  function seed_random(){
  while (contador < 1000){
    x = Math.floor(Math.random() * (t + 1));
    y = Math.floor(Math.random() * (t + 1));
    if (q.isFilled(x, y)){
      continue
    }
    else{
      q.fill(x, y, viva);
      contador = contador + 1
    }
  }
  contador = 0
}

function update_lifes() {
  lifes_str = 'Gen: ' + lifes.toString()
  q_lifes = createQuadrille(lifes_str)
  
}
function mouseClicked(){
    x = q.mouseCol
    y = q.mouseRow
    seed_creator(x, y)
    
  }
  
//Resetear
    
function reset() {
  q = createQuadrille(t, t)
  lifes = 0
}