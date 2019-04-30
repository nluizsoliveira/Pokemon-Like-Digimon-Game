
class Digimon {
    private choice: number; //Used to store the choice between defensive, fast ot strong digimon.
    private level: number;
    private hp: number;
    private atk: number;
    private speed: number;
    private current_hp: number;
    private current_stamina : number;
    private stamina: number; //Used to control the use of special attacks.
    private names: string[]; 
    private digi_img_urls: string[];
    private name: string;
    private url: string;


    
    constructor(digimon : number){
        this.choice = digimon;
        this.level = 0;
        this.stamina = 5;
        this.names  = ["Tokomon", "Chibimon", "Pabumon","Pagumon","Patamon","Gomamon","Guilmon","Lopmon","Seraphimon","MetalGarurumon","AncidentGreymon", "Cherubimon"];
        this.digi_img_urls = ["./src/choice11.png", "./src/choice21.png", "./src/choice31.png", "./src/choice41.png", "./src/choice12.png", "./src/choice22.png", "./src/choice32.png", "./src/choice42.png", "./src/choice.png", "./src/choice13.png", "./src/choice23.png", "./src/choice33.png", "./src/choice43.png"];
        this.name = this.names[this.choice-1];
        this.url = this.digi_img_urls[this.choice - 1];
        if(this.choice == 1){
            this.speed = 1.2;
            this.atk = 1.2;
            this.hp = 15;
        }

        else if(this.choice == 2){
            this.speed = 2;
            this.atk = 1.5;
            this.hp = 10;

        }

        else if(this.choice == 3){
            this.speed = 1.5;
            this.atk = 2;
            this.hp = 10;
        }

        else{
            this.speed = 1.5;
            this.atk = 2;
            this.hp = 8;
        }
        this.current_hp = this.hp;
        this.current_stamina = this.stamina;
    }
    
    setCurrent_Stamina(n: number){
        this.current_stamina = n;
    }

    getCurrent_Stamina(){
        return this.current_stamina;
    }
    getChoice(){
        return this.choice;
    }

    setChoice(digimon: number){
        this.choice = digimon;
    }
    getLevel(){ 
        return this.level;
    }

    setLevel(level: number){
        this.level = level;
    }

    getHp(){
        return this.hp;
    }

    setHp(hp: number){
        this.hp = hp;
    }

    getAtk(){
        return this.atk;
    }

    setAtk(atk: number){
        this.atk = atk;
    }

    getSpeed(){
        return this.speed;
    }

    setSpeed(speed: number){
        this.speed = speed;
    }

    getCurrent_Hp(){
        return this.current_hp;
    }

    setCurrent_Hp(current_hp: number){
        this.current_hp = current_hp;
    }

    getStamina(){
        return this.stamina;
    }

    setStamina(stamina: number){
        this.stamina = stamina;
    }

    getUrl(){
        return this.url;
    }
    setUrl(s: string){
        this.url = s;
    }

    getName(){
        return this.name;
    }

    setName(s: string){
        this.name = s;
    }


    
    
    level_up(){
        this.stamina++;
        this.atk = 1.1*(this.atk);
        this.hp = 1.1*this.hp;
        this.speed = 1.1*this.speed;

    }

    tackle(Enemy: Digimon){
            Enemy.current_hp = Enemy.current_hp - this.atk;
            this.current_stamina--;
    }

    random_attack(Enemy: Digimon){
        this.tackle(Enemy);
    }

    async attack(atk_choice: number, Enemy: Digimon, pagina: page){
        if(atk_choice == 1){
            if (this.getSpeed() >= Enemy.getSpeed()){
                this.tackle(Enemy);
                pagina.digivice_instruction!.innerHTML = (this.getName()+" used Tackle!");
                await pagina.delay(2000);
                pagina.atualiza_arena(this, Enemy);
                if(Enemy.getCurrent_Hp() <= 0){
                    alert("meu deus voce matou o omi");
                    pagina.evolve(this, Enemy);
                    /*
                    this.level_up();
                    this.evolve(this);
                    pagina.level_up();
                    pagina.evolve(Enemy);
                    //animacao que ganhou luta
                    //chamar proxima luta
                    */
                }
                else{
                    Enemy.random_attack(this);
                    pagina.digivice_instruction!.innerHTML = ("Enemy" + Enemy.getName()+" used Tackle!");
                    await pagina.delay(2000);
                    pagina.atualiza_arena(this, Enemy);

    
                    if(this.current_hp <= 0){
                        alert("The game's over! You lost");
                        document.location.reload();
                        
                    }
                }

            }

            else{
                Enemy.random_attack(this);
                pagina.digivice_instruction!.innerHTML = ("Enemy "+ Enemy.getName()+" used Tackle!");
                await pagina.delay(2000);
                pagina.atualiza_arena(this, Enemy);


                if(this.current_hp <= 0){
                    alert("The game's over! You lost");
                    document.location.reload();
                }
                else{
                    this.tackle(Enemy);
                    pagina.digivice_instruction!.innerHTML = (this.getName()+" used Tackle!");
                    await pagina.delay(2000);
                    pagina.atualiza_arena(this, Enemy);
                }

                if(Enemy.getCurrent_Hp() <= 0){
                    alert("meu deus voce matou o omi");
                    pagina.evolve(this, Enemy);

                    /*
                    this.level_up();
                    this.evolve(this);
                    pagina.level_up();
                    pagina.evolve(Enemy);
                    //animacao que ganhou luta
                    //chamar proxima luta
                    */

                }
            }
        }
            
        else{
            pagina.digivice_instruction!.innerHTML = ("You need to evolve to use this attack! Try tackle!");
            
        }
    }

}

class Rookie extends Digimon{

    constructor(old_digimon: Digimon){
        super(old_digimon.getChoice() + 4);
    }

    bite(Enemy: Digimon){
        Enemy.setCurrent_Hp(Enemy.getCurrent_Hp() - 1.5*this.getAtk());
        this.setCurrent_Stamina(this.getCurrent_Stamina()-2);
    }

    random_attack(Enemy: Digimon){
        let rand = Math.floor((Math.random() * 2) + 1);

        if(rand == 1){
            this.tackle(Enemy);
        }

        else this.bite(Enemy);
    }
}

class Mega extends Rookie{

    
    
    energy_wave(Enemy: Digimon){
        Enemy.setCurrent_Hp(Enemy.getCurrent_Hp() - 2*this.getAtk());
        this.setCurrent_Stamina(this.getCurrent_Stamina()-3);
    }

    random_attack(Enemy: Digimon){
        let rand = Math.floor((Math.random() * 3) + 1);

        if(rand == 1){
            this.tackle(Enemy);
        }

        else if(rand == 2){
            this.bite(Enemy);
        }

        else this.energy_wave(Enemy);
    }
}

class page{
    public digivice_instruction: (HTMLElement | null);
    public arena: (HTMLElement | null);
    public aliado: (HTMLElement | null);
    public oponente: (HTMLElement | null);
    public body: (HTMLElement | null);
    public titulo: (HTMLElement | null);
    public description: (HTMLElement | null);
    public digivice: (HTMLElement | null);
    public main_screen: (HTMLElement | null);
    public enemy_digimon_pic: (HTMLElement | null);
    public ally_digimon_pic: (HTMLElement | null);
    public start: (HTMLElement | null);
    public flux_control: number;
    public page_url: string;
    public egg1: (HTMLElement | null);
    public egg2: (HTMLElement | null);
    public egg3: (HTMLElement | null);
    public eggchoice: number;
    public names: string[]; 
    public digi_img_urls: string[];
    public foto_inimigo: (HTMLElement | null);
    public nome_inimigo: (HTMLElement | null);
    public level_inimigo: (HTMLElement | null);
    public vida_inimigo: (HTMLElement | null);
    public stamina_inimigo: (HTMLElement | null);
    public foto_aliado: (HTMLElement | null);
    public nome_aliado: (HTMLElement | null);
    public level_aliado: (HTMLElement | null);
    public vida_aliado: (HTMLElement | null);
    public stamina_aliado: (HTMLElement | null);
    public golpe_um: (HTMLElement | null);
    public golpe_dois: (HTMLElement | null);
    public golpe_tres: (HTMLElement | null);
    //stamina_aliado, nome_inimigo, level_inimigo, vida_inimigo, stamina_aliado,  nome_aliado,    level_aliado,       vida_aliado, digivice_instructions, golpe_um, golpe_dois, golpe_tres                                  
 



    constructor(){
        this.digivice_instruction = document.getElementById("digivice_instruction");
        this.aliado = document.getElementById("aliado");
        this.arena = document.getElementById("arena");
        this.oponente = document.getElementById("oponente");
        this.titulo = document.getElementById("titulo");
        this.body = document.getElementById("body");
        this.description = document.getElementById("digivice_instruction");
        this.digivice = document.getElementById("digivice");
        this.main_screen = document.getElementById("main_screen");
        this.enemy_digimon_pic = null;
        this.ally_digimon_pic = null;
        this.start = document.getElementById("start");

        this.flux_control = 0;
        this.page_url = document.URL;
        this.egg1 = null;
        this.egg2 = null;
        this.egg3 = null;
        this.eggchoice = 0;
        this.names  = ["Tokomon", "Chibimon", "Pabumon","Pagumon","Patamon","Gomamon","Guilmon","Lopmon","Seraphimon","MetalGarurumon","AncidentGreymon", "Cherubimon"];
        this.digi_img_urls = ["./src/choice11.png", "./src/choice21.png", "./src/choice31.png", "./src/choice41.png", "./src/choice12.png", "./src/choice22.png", "./src/choice32.png", "./src/choice42.png", "./src/choice.png", "./src/choice13.png", "./src/choice23.png", "./src/choice33.png", "./src/choice43.png"];


        this.foto_inimigo = null;
        this.nome_inimigo = null;
        this.level_inimigo = null;
        this.vida_inimigo = null;
        this.stamina_inimigo = null;
        this.foto_aliado = null;
        this.nome_aliado = null;
        this.level_aliado = null;
        this.vida_aliado = null;
        this.stamina_aliado = null;
        this.golpe_um =  document.getElementById("golpe_um");
        this.golpe_dois = document.getElementById("golpe_dois");
        this.golpe_tres = document.getElementById("golpe_tres");
    }

    apaga(elemento: HTMLElement | null){
        if(elemento != null){
            elemento.textContent = null;
        }
    }
    
    apaga_descricao(){
        this.apaga(this.description);
    }

    apaga_imagem(elemento: HTMLElement | null){
        if(elemento != null){
            elemento.style.maxWidth = "0px";
        }
    }

    apaga_digivice(){
        this.apaga_imagem(this.digivice);
    }

    altera_imagem(elemento: HTMLElement | null, url: string){
        if(elemento != null){
            elemento.setAttribute('src', url);;
        }
    }

    async atualiza_arena(aliado: Digimon, inimigo: Digimon){
        this.description = document.getElementById("description");
        this.digivice_instruction = document.getElementById("digivice_instruction");
        this.arena = document.getElementById("arena");
        this.apaga(this.description);
        this.description!.style.margin = "0px";
        this.arena!.style.minHeight = "60%";
        this.arena!.style.height = "60%";

        this.aliado = document.getElementById("aliado");
        this.aliado!.style.height = "30%";
        
        this.oponente = document.getElementById("oponente");
        this.oponente!.style.height = "30%";

        this.main_screen!.style.height = "100%";

        this.foto_inimigo = document.getElementById("foto_inimigo"); //
        this.nome_inimigo = document.getElementById("nome_inimigo"); //
        this.level_inimigo = document.getElementById("level_inimigo"); //
        this.vida_inimigo = document.getElementById("vida_inimigo");
        this.stamina_inimigo = document.getElementById("stamina_inimigo");
        this.foto_aliado  = document.getElementById("foto_aliado"); //
        this.nome_aliado  = document.getElementById("nome_aliado"); //
        this.level_aliado = document.getElementById("level_aliado"); //
        this.vida_aliado = document.getElementById("vida_aliado");
        this.stamina_aliado = document.getElementById("stamina_aliado");

        //assigna fotos
        this.altera_imagem(this.foto_inimigo, inimigo.getUrl());
        this.altera_imagem(this.foto_aliado, aliado.getUrl());

        //assigna textos
        this.nome_inimigo!.innerHTML = inimigo.getName();
        this.nome_aliado!.innerHTML = aliado.getName();
        this.level_inimigo!.innerHTML = inimigo.getLevel().toString();
        this.level_aliado!.innerHTML = inimigo.getLevel().toString();

        //setta barras vida e stamina inimigo
        this.vida_inimigo!.setAttribute('max', inimigo.getHp().toString());
        this.vida_inimigo!.setAttribute('value', inimigo.getCurrent_Hp().toString());

        this.stamina_inimigo!.setAttribute('max', inimigo.getStamina().toString());
        this.stamina_inimigo!.setAttribute('value', inimigo.getCurrent_Stamina().toString());
        this.stamina_inimigo!.style.maxWidth = "0px";

        //setta barras vida e stamina aliados
        this.vida_aliado!.setAttribute('max', aliado.getHp().toString());
        this.vida_aliado!.setAttribute('value', aliado.getCurrent_Hp().toString());

        this.stamina_aliado!.setAttribute('max', aliado.getStamina().toString());
        this.stamina_aliado!.setAttribute('value', aliado.getCurrent_Stamina().toString());

        //assigna golpes aos botoes 
        this.golpe_um =  document.getElementById("golpe_um");
        this.golpe_dois = document.getElementById("golpe_dois");
        this.golpe_tres = document.getElementById("golpe_tres");
        this.digivice_instruction!.innerHTML = "Click on your next move!";
    }

    
    delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }


    

    async event_one(ally_digimon: Digimon, enemy_digimon: Digimon){
        
        if(this.flux_control == 0){
        this.altera_imagem(this.digivice, "./src/hello.png")
        this.description!.innerText = "Welcome to DigiWorld! Your first task is to choose your Digimon.";
        await this.delay(4000);
        this.digivice!.style.maxWidth = "0px";

        this.description!.innerText = "Egg1 encubates a very Resistant Digimon.\nEgg2 encubates a very Fast Digimon.\nEgg3 encubates a Powerful Damage-Dealer Digimon.\n\nClick on the egg you would like to choose!";
        this.main_screen!.innerHTML = '    <img id = "egg1" src = "./src/choice10.png">     <img id = "egg2" src = "./src/choice20.png">     <img id = "egg3" src = "./src/choice30.png">';
        this.flux_control++;

        this.egg1 = document.getElementById("egg1");
        this.egg2 = document.getElementById("egg2");
        this.egg3 = document.getElementById("egg3");

        let call_event_two_choice1 = ()=>{this.event_two(1, ally_digimon, enemy_digimon)};
        let call_event_two_choice2 = ()=>{this.event_two(2, ally_digimon, enemy_digimon)};
        let call_event_two_choice3 = ()=>{this.event_two(3, ally_digimon, enemy_digimon)};

        this.egg1!.addEventListener("click", call_event_two_choice1);
        this.egg2!.addEventListener("click", call_event_two_choice2);
        this.egg3!.addEventListener("click", call_event_two_choice3);
        }
    }

    async event_two(choice: number, ally_digimon: Digimon, enemy_digimon: Digimon){
        this.eggchoice = choice;
        this.egg1!.style.maxWidth = "0px";
        this.egg2!.style.maxWidth = "0px";
        this.egg3!.style.maxWidth = "0px";

        let aux_digimon = new Digimon(choice);
        Object.assign(ally_digimon, aux_digimon);
        
        this.altera_imagem(this.digivice, "./src/egg_hatch.gif");
        this.digivice!.style.maxWidth = "30%";
        this.description!.innerText = "Hatching...";
        
        await this.delay(5000);
        this.description!.innerText=("Congrats! This is your new " + this.names[choice-1]);
        this.altera_imagem(this.digivice, this.digi_img_urls[choice-1]);
        ally_digimon.setUrl(this.digi_img_urls[choice-1]);
        ally_digimon.setName(this.names[choice-1]);

        
        await this.delay(4000);
        this.main_screen!.innerHTML = '<div id = "arena"><div id = oponente><img id = "foto_inimigo" src ="./src/choice41.png"></div><div id = "aliado"><img id = "foto_aliado" src = "./src/choice21.png"></div></div>';
        //'<div id = "arena"><div id = oponente><img id = "fotodigimon" src ="./src/choice41.png"><p>teste</p></div><div id = "aliado"><img id = "fotoaliado" src = "./src/choice21.png"><p>teste</p></div></div>'
        this.digivice!.style.maxWidth = "0px";
        this.digivice!.style.borderBottom = "0px";

        this.ally_digimon_pic = document.getElementById("foto_aliado");
        this.enemy_digimon_pic = document.getElementById("foto_inimigo");
        this.altera_imagem(this.ally_digimon_pic, ally_digimon.getUrl());
        this.altera_imagem(this.enemy_digimon_pic, enemy_digimon.getUrl());

        this.description!.innerText=("Oh no! " + this.names[choice-1] + " Is being attacked by " + this.names[3]);
        this.start!.style.maxWidth = "100%";


        let call_event_three = ()=>{this.event_three(ally_digimon, enemy_digimon)};
        this.start!.addEventListener("click", call_event_three);
        
    }


    async event_three(ally_digimon: Digimon, enemy_digimon: Digimon){
        this.body!.innerHTML = '    <h1 id="titulo">Pokemon-Like Digimon Game</h1><p id="description">Digimon is better than Pokemon at everything, except for its games. This project intents to recreate the classical Pokemon playstyle with Digimon.</p><div id="main_screen"><div id="arena"><div id="oponente"><img id="foto_inimigo" src="./src/choice41.png"><p></p><b id = "nome_inimigo">Inimigo</b> <b>Level </b> <b id = "level_inimigo">30</b><p></p><b>Hp: </b><progress id="vida_inimigo" value="30" max="100"></progress></b><p></p><b></b><progress id="stamina_inimigo" value="50" max="100"></div><div id="aliado"><img id="foto_aliado" src="./src/choice11.png"><p></p><b id = "nome_aliado">Aliado</b> <b>Level </b> <b id = "level_aliado">30</b><p></p><b>Hp: </b><progress id="vida_aliado" value="70" max="100"></progress></b><p></p><b> Stamina: </b><progress id="stamina_aliado" value="20" max="100"></div></div><p id="digivice_instruction">Oh no! Tokomon Is being attacked by Pagumon</p><img id="golpe_um" src="./src/tackle.png" style="max-width: 100%;"><img id="golpe_dois" src="./src/bite.png" style="max-width: 100%;"><img id="golpe_tres" src="./src/laser.png" style="max-width: 100%;"></div>';
        this.atualiza_arena(ally_digimon, enemy_digimon);
        
        let tackle_try = ()=>{ally_digimon.attack(1, enemy_digimon,this)};
        this.golpe_um!.addEventListener("click", tackle_try);

        let bite_try = ()=>{ally_digimon.attack(2, enemy_digimon,this)};
        this.golpe_dois!.addEventListener("click", bite_try);
        
        let laser_try = ()=>{ally_digimon.attack(3, enemy_digimon,this)};
        this.golpe_tres!.addEventListener("click", laser_try);

    }

    async evolve(digimon: Digimon, enemy: Digimon){
        digimon.level_up;
        enemy.level_up;
        digimon = new Rookie(digimon);
        enemy = new Rookie(enemy);
        alert("Congrats! This is your new " + digimon.getName());
        this.atualiza_arena(digimon, enemy);
    }


}

//sudo apt install node-typescript
//tsc --init
//apertar ctrl shift b - tasks.
//ir em tconfig.json e deixar "target": "ES2015"
//colocar funcoes que usam delay() como assincronas
//usar await antes da chamada de delay()  

    window.onload = function event_caller() {
        let ally_digimon = new Digimon(-1);
        let enemy_digimon = new Digimon(4);
        let pagina = new page();
        let call_event_one = ()=>{pagina.event_one(ally_digimon, enemy_digimon)};
        pagina.digivice!.addEventListener("click", call_event_one);

        


        

        //pagina.digivice.removeEventListener("click", funcao);
    }
/**
 * 
 * Meu evento 3 cria a arena de batalha.
 * Ao clickar, vou para ataca(argumento: numero do ataque)
 * no digimon bebe, se o argumento for 1, usa tackle(digimon inimigo) else alerta invalido
 * no digimon rookie, se o argumento for 1, usa tackle no inimigo, se for 2, usa bite elsa alerta invalido
 * no digimon ultimo, se o argumento for 1, usa tackle no inimigo, se for 2, usa bite else alerta invalido
 * 
 * ATACA(){
        SE(EU SOU MAIS RAPIDO){
            ATACO()

            SE(MATAR){
                AUMENTA NIVEL
                DIGIEVOLUI
                DIGIMON INIMIGO AUMENTA NIVEL
                DIGIMON INIMIGO DIGIEVOLUI
                CHAMA O EVENTO DE BATALHA DE NOVO
            }

                SE NÃO{

                DIGIMON INIMIGO ATACA

                SE(MATAR){
                    ACABOU O JOGO.
                }
            }
        }

        SE(ELE É MAIS RAPIDO){
            ELE USA GOLPE ALEATORIO
            SE(MATOU){
                GAME OVER
            }

            SE NÃO{
                EU ATACO
                SE MATOU{
                    GAME OVER
                }
            }
        }
    }
 * 
 * 
 * 
 * 
*/
