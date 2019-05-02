

//Classe principal do programa, que armazena informações relativas a um digimon. 
/**
 * 
 * Rookies extendem digimons comuns, e Megas extendem Rookies.
 * Digievoluir (Herdar) libera novos golpes e atualiza o comando attack(enemy_digimon), que agora permite a exe
 * cução te tais golpes. 
 * 
 * 
 */
class Digimon {
    private choice: number; //Stores the choice between defensive, fast ot strong digimon.
    private level: number;
    private hp: number;
    private atk: number;
    private speed: number;
    private current_hp: number;
    private current_stamina : number;
    private stamina: number; //Used to control the use of special attacks. (In development)
    private names: string[];            //String with the name of every possible digimon
    private digi_img_urls: string[];    //String with the path to every digimon image url
    private name: string;               //String with the current digimon name
    private url: string;                //String with the current digimon path to image url


    //constroi um digimon baseado na escolha 1- Digimon Tank, 2- Digimon Rápido, 3- Digimon Forte
    constructor(digimon_choice : number){
        this.choice = digimon_choice;
        this.level = 0;
        this.stamina = 5;

        //As 4 proximas linhas ajustam o nome e url para a foto do Digimon baseado na escolha do ovo
        this.names  = ["Renamon", "Gaomon", "Agumon","Lopmon","Kyubimon","Gaogamamon","MetalGreymon","Antylamon","Sakuyamon","MachGaogamon","Goldramon", "Cherubimon"];
        this.digi_img_urls = ["./src/choice11.gif", "./src/choice21.gif", "./src/choice31.gif", "./src/choice41.gif", "./src/choice12.gif", "./src/choice22.gif", "./src/choice32.gif", "./src/choice42.gif", "./src/choice13.gif", "./src/choice23.gif", "./src/choice33.gif", "./src/choice43.gif"];
        this.name = this.names[this.choice-1];
        this.url = this.digi_img_urls[this.choice - 1];
        
        //Ajusta ataque, velocidade e HP à escolha de digimon do usuario 
        if(this.choice == 1 || this.choice == 5 || this.choice == 9){
            this.speed = 1.2;
            this.atk = 1.2;
            this.hp = 20;
        }

        else if(this.choice == 2 || this.choice == 6 || this.choice == 10){
            this.speed = 2;
            this.atk = 1.5;
            this.hp = 12;

        }

        else if(this.choice == 3 || this.choice == 7 || this.choice == 11){
            this.speed = 1.5;
            this.atk = 2;
            this.hp = 10;
        }

        else{
            this.speed = 1.5;
            this.atk = 2;
            this.hp = 7;
        }
        //seta hp e stamina atual como maximos
        this.current_hp = this.hp;
        this.current_stamina = this.stamina;
    }
    

    //getters e setters dos atributos privados
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


    //funcao que incrementa o nivel de um digimon e o deixa mais forte
    level_up(){
        this.level++;
        this.stamina++;
        this.atk = 1.1*(this.atk);
        this.hp = 1.1*this.hp;
        this.speed = 1.1*this.speed;

    }

    //funcao de ataque tackle
    tackle(Enemy: Digimon){
            Enemy.current_hp = Enemy.current_hp - this.atk;
            this.current_stamina--;
    }

    random_attack(Enemy: Digimon){
        this.tackle(Enemy);
    }

   /*Funcao que controla o ataque de um digimon a outro, baseada na escolha de um ataque*/
     
    /**
     * No programa como um todo, digimons podem realizar 3 ataques: Tackle, Bite e Laser.
     * Foi assimilada à instrução tackle o número 1, Bite, 2 e Laser 3 na função de controle de eventos mais a frente.
     * 
     */
    async attack(atk_choice: number, Enemy: Digimon, pagina: page){

        //Se o golpe escolhido for tackle, o ataque prossegue. 
        if(atk_choice == 1){
            //O digimon mais rapido ataca primeiro. 
            if (this.getSpeed() >= Enemy.getSpeed()){
                this.tackle(Enemy);
                pagina.digivice_instruction!.innerHTML = (this.getName()+" used Tackle!");//insere no HTML de instrucoes o aviso de ataque
                await pagina.delay(2000);  //Espera 2 segundos para dar naturalidade ao processo
                pagina.atualiza_arena(); //Chama função de pagina que atualiza o campo de combate com os atributos após o combate
                
                await pagina.delay(5);
                if(Enemy.getCurrent_Hp() <= 0){ //Caso o inimigo morra
                    await pagina.delay(5);
                    alert("Parabéns, você eliminou o inimigo! Ele evoluiu para continuar a batalha, e você tambem.");
                    if(this.level == 2){
                        alert("O jogo acabou");
                        document.location.reload();

                    }
                    await pagina.evolve(); //evolui o digimon. A funcao ainda nao esta totalmente implementada.
                    
                }
                
                else{//Caso o inimigo não morra, ele ataca e o processo acima se repete.
                    await pagina.delay(5);
                    Enemy.random_attack(this);
                    pagina.digivice_instruction!.innerHTML = ("Enemy" + Enemy.getName()+" used Tackle!");
                    await pagina.delay(2000);
                    pagina.atualiza_arena();

    
                    if(this.current_hp <= 0){//Caso o inimigo te elimine, é alertado que o jogo acabou e a página refresha
                        alert("The game's over! You lost");
                        document.location.reload();
                        
                    }
                }

            }

            else{//Se o inimigo for mais rápido, o mesmo ocorre, mas com ele atacando primeiro.
                await pagina.delay(5);
                Enemy.random_attack(this);
                pagina.digivice_instruction!.innerHTML = ("Enemy "+ Enemy.getName()+" used Tackle!");
                await pagina.delay(2000);
                pagina.atualiza_arena();


                if(this.current_hp <= 0){
                    alert("The game's over! You lost");
                    document.location.reload();
                }
                else{
                    await pagina.delay(5);
                    this.tackle(Enemy);
                    pagina.digivice_instruction!.innerHTML = (this.getName()+" used Tackle!");
                    await pagina.delay(2000);
                    pagina.atualiza_arena();
                }

                if(Enemy.getCurrent_Hp() <= 0){
                    await pagina.delay(5);
                    alert("Parabéns, você eliminou o inimigo! Ele evoluiu para continuar a batalha, e você tambem.");
                    if(this.level == 2){
                        alert("O jogo acabou");
                        document.location.reload();

                    }
                    await pagina.evolve();
                    
                }
            }
        }
        
        //se o ataque escolhido não for tackle, é informado ao usuário que o digimon precisa evoluir para executar a função
        else{
            pagina.digivice_instruction!.innerHTML = ("You need to evolve to use this attack! Try tackle!");
            
        }
    }

}

//Ser da classe rookie permite ao digimon utilizar, além de tackle, bite. random_attack é atualizada à esta necessidade
//, e battle(digimon) será implementada para a proxima fase
class Rookie extends Digimon{

    constructor(old_digimon: Digimon){
        super(old_digimon.getChoice() + 4); //São 4 digimons iniciais (3 aliados e 1 inimigo), cada um com 
                                            //3 evoluções. Pular 4 posicoes no vetor indica ir para a proxima evolucao correspondente
        this.setLevel(old_digimon.getLevel());

    }

    bite(Enemy: Digimon){
        Enemy.setCurrent_Hp(Enemy.getCurrent_Hp() - 1.5*this.getAtk());
        this.setCurrent_Stamina(this.getCurrent_Stamina()-2);
    }

    random_attack(Enemy: Digimon){ //usa aleatoriamente tackle ou bite
        let rand = Math.floor((Math.random() * 2) + 1);//gera numero aleatorio entre [1 e 2]

        if(rand == 1){
            this.tackle(Enemy);
        }

        else this.bite(Enemy);
    }
}

//Digimons mega podem utilizar energy_wave. Em construção, ainda não há digimons mega nesta fase de implementacao.
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

/**
 * 
 * Na implementação, utilizou-se manipulação de DOM (Elementos HTML) da página para que a mesma fosse dinâmica.
 * Para tal, foi necessária a criação de uma classe page, que armazena referências aos elementos HTML da página
 * com base em seu id (O nome do digimon tem um id, o seu level tem um id, etc.)
 * 
 * Também nela são definidas as funções triggadas por event.listeners, que são ativadas quando uma ação específica é executada
 * em um elemento específico. Por exemplo, a página de seleção de ovo é chamada quando se clicka no digivice da página
 * inicial. Tal evento é especificado em página, pois a modifica.
 * 
 * 
 * 
 * 
 * 
 * 
 */
class page{
    public ally_digimon: Digimon;
    public enemy_digimon: Digimon;
    //TODOS os atributos de carater (HTMLElement|null) são REFERENCIAS a elementos HTML. Primeiramente, 
    //São declarados como elementos ou null pois o elemento com tal id pode ainda não existir.
    //Seu assignment é feito ao longo do programa.
    public digivice_instruction: (HTMLElement | null);  //instrucao que indica ao jogador o que fazer 
    public arena: (HTMLElement | null);                 //arena onde ocorre a batalha
    public aliado: (HTMLElement | null);                //div que cobre o aliado
    public oponente: (HTMLElement | null);              //div que cobre o inimigo
    public body: (HTMLElement | null);                  //corpo da pagina
    public titulo: (HTMLElement | null);                //titulo da pagina
    public description: (HTMLElement | null);           //descricao abaixo do titulo da pagina
    public digivice: (HTMLElement | null);              //imagem de digivice no comeco do jogo
    public main_screen: (HTMLElement | null);           //tela principal, onde são feitas as modificações de HTML. 
                                                        //trata-se de uma div vazia cujo innner html é constantemente modificado.
    public enemy_digimon_pic: (HTMLElement | null);     //foto do digimon aliado 
    public ally_digimon_pic: (HTMLElement | null);      //foto do digimon inimigo
    public start: (HTMLElement | null);                 //imagem de start que aparece quando o digimon é atacado
    
    public flux_control: number;                        //auxiliar de fluxo que impede clicke duplo no divigice (Event.Listeners continuam mesmo apos o primeiro click)
    public egg1: (HTMLElement | null);                  //foto do ovo 1
    public egg2: (HTMLElement | null);                  //foto do ovo 2
    public egg3: (HTMLElement | null);                  //foto do ovo 3
    public eggchoice: number;                           //armazena qual ovo foi escolhido
    public names: string[];                             //string com nomes dos possiveis digimon
    public digi_img_urls: string[];                     //string com imagens dos possiveis digimon

    //Novamente, no momento, todos os possiveis atributos são apenas REFERENCIAS a elementos HTML com ids especificas
    //Mesmo o conteúdo deles estando presente em digimon, é necessário que sua referencia ao HTML seja declarada
    //para que a mudança em digimon possa ser expressa em mudanças na tela do usuário

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

    //O construtor não faz muita coisa, inicialmente.
    //A maioria dos elementos declarados acima é nulo, pois na página HTML inicial 
    //NÃO HÁ ELEMENTOS COM AS IDS QUE ESTES PROCURAM. Entretanto, é necessário que 
    //atributos declarados sejam inicializados no construtor.
    //Os atributos comentados são os que realmente fazem diferença ao funcionamento do programa.
    constructor(){
        this.ally_digimon = new Digimon(-1);
        this.enemy_digimon =  new Digimon(4);
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

        this.flux_control = 0;//setta flux_control a zero, indicando que ainda não se clickou no digivice
        this.egg1 = null;
        this.egg2 = null;
        this.egg3 = null;
        this.eggchoice = 0;
        //guarda os nomes dos possiveis digimon
        this.names  = ["Renamon", "Gaomon", "Agumon","Lopmon","Kyubimon","Gaogamamon","MetalGreymon","Antylamon","Sakuyamon","MachGaogamon","Goldramon", "Cherubimon"];
        this.digi_img_urls = ["./src/choice11.gif", "./src/choice21.gif", "./src/choice31.gif", "./src/choice41.gif", "./src/choice12.gif", "./src/choice22.gif", "./src/choice32.gif", "./src/choice42.gif", "./src/choice13.gif", "./src/choice23.gif", "./src/choice33.gif", "./src/choice43.gif"];


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

    //funcao que apaga o conteúdo de um elemento HTML da tela com base em seu id
    apaga(elemento: HTMLElement | null){
        if(elemento != null){
            elemento.textContent = null;
        }
    }
    
    //funcao que apaga o conteúdo da descricao abaixo do titulo do jogo
    apaga_descricao(){
        this.apaga(this.description);
    }

    //funcao que "apaga" uma imagem, settando seu tamanho a 0px. A imagem não é de fato apagada, 
    //seu tamanho é settado a zero. Ainda existirá no DOM uma tag <img> com o id assimilato a elemento.
    apaga_imagem(elemento: HTMLElement | null){
        if(elemento != null){
            elemento.style.maxWidth = "0px";
        }
    }

    //chama apaga_imagem para digivice
    apaga_digivice(){
        this.apaga_imagem(this.digivice);
    }

    //altera a url-base de uma referência a elemento HTML do tipo <img>. Permite que a mesma
    //tag passe a mostrar outra imagem.
    altera_imagem(elemento: HTMLElement | null, url: string){
        if(elemento != null){
            elemento.setAttribute('src', url);;
        }
    }

    //O método é declarado como assíncrono para que delay() funciona corretamente.
    //caso não seja, delay(3000) seguido de delay(4000) espera 4 segundos, e não 7.

    //funcao principal de pagina. Atualiza TODOS os elementos do campo de batalha para que reflitam
    //as condicoes atuais dos digimon. É uma função polimórfica! Funciona para qualquer digimon,
    //seja base, rookie ou Mega
    async atualiza_arena(){
        //Assimilam descricao, digivice e arena a elementos HTML com suas respectivas Tags;
        this.description = document.getElementById("description");
        this.digivice_instruction = document.getElementById("digivice_instruction");
        this.arena = document.getElementById("arena");
        this.apaga(this.description);
        //Ajustam o HTML da pagina para que a arena se pareça com uma arena de fato
        this.description!.style.margin = "0px";
        this.arena!.style.minHeight = "60%";
        this.arena!.style.height = "60%";

        //assimila as divs que contem o aliado e o oponente e as ajustam para visual mais agradavel
        this.aliado = document.getElementById("aliado");
        this.aliado!.style.height = "30%";
        
        this.oponente = document.getElementById("oponente");
        this.oponente!.style.height = "30%";

        this.main_screen!.style.height = "100%";

        //assimilam referências a elementos HTML a elementos com suas respectivas tags 
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

        //de fato altera a foto do já assimilado elemento
        this.altera_imagem(this.foto_inimigo, this.enemy_digimon.getUrl());
        this.altera_imagem(this.foto_aliado, this.ally_digimon.getUrl());

        //De fato altera conteúdo do elemento da referência acima ssimilada
        this.nome_inimigo!.innerHTML = this.enemy_digimon.getName();
        this.nome_aliado!.innerHTML = this.ally_digimon.getName();
        this.level_inimigo!.innerHTML = this.enemy_digimon.getLevel().toString();
        this.level_aliado!.innerHTML = this.enemy_digimon.getLevel().toString();

        //setta barras vida e stamina inimigo
        this.vida_inimigo!.setAttribute('max', this.enemy_digimon.getHp().toString());
        this.vida_inimigo!.setAttribute('value', this.enemy_digimon.getCurrent_Hp().toString());

        this.stamina_inimigo!.setAttribute('max', this.enemy_digimon.getStamina().toString());
        this.stamina_inimigo!.setAttribute('value', this.enemy_digimon.getCurrent_Stamina().toString());
        this.stamina_inimigo!.style.maxWidth = "0px";

        //setta barras vida e stamina aliados
        this.vida_aliado!.setAttribute('max', this.ally_digimon.getHp().toString());
        this.vida_aliado!.setAttribute('value', this.ally_digimon.getCurrent_Hp().toString());

        this.stamina_aliado!.setAttribute('max', this.ally_digimon.getStamina().toString());
        this.stamina_aliado!.setAttribute('value', this.ally_digimon.getCurrent_Stamina().toString());

        //assigna golpes aos botoes 
        this.golpe_um =  document.getElementById("golpe_um");
        this.golpe_dois = document.getElementById("golpe_dois");
        this.golpe_tres = document.getElementById("golpe_tres");
        this.digivice_instruction!.innerHTML = "Click on your next move!";
    }

    //funcao que gera delay, semelhante a sleep() do c
    delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }


    
    //evento que ocorre quando o usuário clicka no digivice. Chama a imagem de boas vindas, 
    //e gera as 3 imagens de digiovo as quais o usuario pode escolher.
    async event_one(){
        //garante que, mesmo que o evento seja triggerado varias vezes, apenas rodará uma vez
        if(this.flux_control == 0){
            await this.delay(100);
            this.altera_imagem(this.digivice, "./src/hello.gif")    //troca a foto do digivace para a de boas vindas

            this.description!.innerText = "Welcome to DigiWorld! Your first task is to choose your Digimon."; //troca mensagem para de boas vindas
            await this.delay(6200);
            this.digivice!.style.maxWidth = "0px";//apos 4 segundos, faz mensagens de boas vindas ficar invisivel
            await this.delay(100);

            //descricao indica agora a escolha do digivice.
            this.description!.innerHTML = '<br>Egg1 encubates a very <span style = "color: #FFDC00">Resistant</span> Digimon.<br>Egg2 encubates a very <span style = "color: #001f3f">Fast</span> Digimon.<br>Egg3 encubates a very <span style = "color: #FF4136">Strong</span> Digimon.<br><br>Click on the egg you would like to choose!';
            //muda HTML da página para que os 3 ovos sejam inseridos
            this.main_screen!.innerHTML = '    <img id = "egg1" src = "./src/choice10.png">     <img id = "egg2" src = "./src/choice20.png">     <img id = "egg3" src = "./src/choice30.png">';
            
            this.flux_control++;//indica que funcao rodou uma vez

            //Assimila referencias de elemento html às imagens com id ovo 1, ovo 2 e ovo 3 
            this.egg1 = document.getElementById("egg1");
            this.egg2 = document.getElementById("egg2");
            this.egg3 = document.getElementById("egg3");

            //Ajusta tamanho dos ovos à tela
            this.egg1!.style.maxWidth = "10%";
            this.egg2!.style.maxWidth = "10%";
            this.egg3!.style.maxWidth = "10%";

            //assimila a o evento dois a variáveis, para que se possa passá-lo como argumento ao event listener.
            //o primeiro argumento indica qual ovo foi escolhido.
            let call_event_two_choice1 = ()=>{this.event_two(1)};
            let call_event_two_choice2 = ()=>{this.event_two(2)};
            let call_event_two_choice3 = ()=>{this.event_two(3)};

            //coloca event listeners de click nas imagens de ovo1, ovo2 e ovo3.
            //Ao clickar na imagem, o evento 2 é chamado e continua o programa.
            this.egg1!.addEventListener("click", call_event_two_choice1);
            this.egg2!.addEventListener("click", call_event_two_choice2);
            this.egg3!.addEventListener("click", call_event_two_choice3);
        }
    }

    //evento dois apaga a tela de selecão de digiovos, mostra o gif do digimon nascendo, 
    //indice que o digimon está sendo atacado e gera a tela de guiar o digimon.
    async event_two(choice: number){
        //guarda na pagina a escolha do digiovo
        this.eggchoice = choice;
        //esconde imagem dos ovos
        this.egg1!.style.maxWidth = "0px";
        this.egg2!.style.maxWidth = "0px";
        this.egg3!.style.maxWidth = "0px";

        let aux_digimon = new Digimon(choice); //cria um novo digimon, já configurado com a escolha certa!
        Object.assign(this.ally_digimon, aux_digimon); //copia o novo digimon, que é configurado com a escolha correta
                                                  //no digimon auxiliar previamente criado na main
        
        //insere gif de digimon nascendo na tela, aumenta seu tamanho para 30% da div em que esta contido
        //e insere descricao de digimon nascendo
        this.altera_imagem(this.digivice, "./src/egg_hatch.gif");
        this.digivice!.style.maxWidth = "30%";
        this.description!.innerText = "Hatching...";
        
        await this.delay(4700);//o gif acima roda por 5 segundos para dar nocao de naturalidade, e impedir
        //que os proximos comandos atropelem os acima
        
        //altera descricao para indicar que o digimon novo nasceu
        this.description!.innerText=("Congrats! This is your new " + this.names[choice-1]);
        //insere na tela imagem com digimon novo
        this.altera_imagem(this.digivice, this.digi_img_urls[choice-1]);
        //assigna corretamente a imagem e o nome do digimon ao digimon novo
        this.ally_digimon.setUrl(this.digi_img_urls[choice-1]);
        this.ally_digimon.setName(this.names[choice-1]);

        
        await this.delay(4000); //espera 4 segundos antes de gerar a tela de digimon sendo atacado

        //insere na tela o frame onde seu digimon está sendo atacado, bem como um botao de ajuda
        this.main_screen!.innerHTML = '<div id = "arena"><div id = oponente><img id = "foto_inimigo" src ="./src/choice41.png"></div><div id = "aliado"><img id = "foto_aliado" src = "./src/choice21.png"></div></div>';
        this.digivice!.style.maxWidth = "0px";  //deixa a imagem do digimon novo invisivel
        this.digivice!.style.borderBottom = "0px"; //deixa a imagem do digimon novo invisivel

        //associa foto do aliado e do inimigo à <img> do html inserido no main_screen.
        //isto é necessário pois são 3 possibilidades de escolha de digimon.
        //portanto, não é possível associar tais fotos diretamente na inserção do html.
        //é necessário inserar duas imagens com tags <img id = "foto_aliado"> e <img id = "foto_inimigo">
        //, garantir que as referencias da página estejam apontando para tais imagens e enfim 
        //alterar a url destas referencias para que mostrem outras imagens
        this.ally_digimon_pic = document.getElementById("foto_aliado");
        this.enemy_digimon_pic = document.getElementById("foto_inimigo");
        this.altera_imagem(this.ally_digimon_pic, this.ally_digimon.getUrl());
        this.altera_imagem(this.enemy_digimon_pic, this.enemy_digimon.getUrl());

        //altera descricao, indicando que o digimon foi atacado
        this.description!.innerText=("Oh no! " + this.names[choice-1] + " Is being attacked by " + this.names[3]);
        //revela o botão de start, até entao oculto
        this.start!.style.maxWidth = "100%";

        //coloca um event listener na imagem de start, que dispara o evento tres quando clickada
        let call_event_three = ()=>{this.event_three()};
        this.start!.addEventListener("click", call_event_three);
        
    }

    //O evento insere o html de uma arena e a atualiza com os campos settados por atualiza_arena. 
    //Na area, são inseridos os botoes de tackle, bite e laser.
    //a cada um deles, é 
    async event_three(){
        this.body!.innerHTML = '    <h1 id="titulo">Pokemon-Like Digimon Game</h1><p id="description">Digimon is better than Pokemon at everything, except for its games. This project intents to recreate the classical Pokemon playstyle with Digimon.</p><div id="main_screen"><div id="arena"><div id="oponente"><img id="foto_inimigo" src="./src/choice41.png"><p></p><b id = "nome_inimigo">Inimigo</b> <b>Level </b> <b id = "level_inimigo">30</b><p></p><b>Hp: </b><progress id="vida_inimigo" value="30" max="100"></progress></b><p></p><b></b><progress id="stamina_inimigo" value="50" max="100"></div><div id="aliado"><img id="foto_aliado" src="./src/choice11.png"><p></p><b id = "nome_aliado">Aliado</b> <b>Level </b> <b id = "level_aliado">30</b><p></p><b>Hp: </b><progress id="vida_aliado" value="70" max="100"></progress></b><p></p><b> Stamina: </b><progress id="stamina_aliado" value="20" max="100"></div></div><p id="digivice_instruction">Oh no! Tokomon Is being attacked by Pagumon</p><img id="golpe_um" src="./src/tackle.png" style="max-width: 100%;"><img id="golpe_dois" src="./src/bite.png" style="max-width: 100%;"><img id="golpe_tres" src="./src/laser.png" style="max-width: 100%;"></div>';
        this.atualiza_arena();
        
                                /**
                                 * 
                                 * !!!!!!!!!!!!! O BUG ESTA AQUI !!!!!!!!!!!!!!!!! (Lembrete pessoal)
                                 * Lembrete: Colocar digimons dentro da pagina. 
                                 * A minha evolve() atualiza a arena com os digimons certos. MAS NESTAS FUNCOES ESTAO OS DIGIMONS ANTIGOS.
                                 * colocar os digimons na pagina e ao invés de passar os digimons como argumentos, que foram passados 
                                 * no click do evento passado, chamar os da pagina que sao atualizados ao final da funcao de evoluir();
                                 */
        await this.delay(5);
        alert("Use ctrl+ and ctrl- to adjust the arena for a more comfortable gameplay!\nClick once per attack command.")

        //attack(n: number, enemy: Digimon) possui como argumento n, o id do golpe a ser executado.
        //tacke_try recebe attack com n = 1;
        //bite_try recebe attack com n = 2;
        //laser_try recebe attack com n = 3;
        //as 3 funções são passadas ao eventlistener de click adequado a cada botão.
    
        let tackle_try = ()=>{this.ally_digimon.attack(1, this.enemy_digimon,this)};
        this.golpe_um!.addEventListener("click", tackle_try);

        let bite_try = ()=>{this.ally_digimon.attack(2, this.enemy_digimon,this)};
        this.golpe_dois!.addEventListener("click", bite_try);
        
        let laser_try = ()=>{this.ally_digimon.attack(3, this.enemy_digimon,this)};
        this.golpe_tres!.addEventListener("click", laser_try);

    }

    //funcao que é chamada quando a batalha acaba.
    //o digimon ganha nivel e seu inimigo também. 
    //são entao associados a novos rookies que possuem como argumento os digimons que antes eram.
    //o construtor de digimon rookies setta corretamente o novo digimon baseado nas propriedades do antigo.
    async evolve(){
        this.ally_digimon.level_up();
        this.enemy_digimon.level_up();

        if(this.ally_digimon.getLevel() >=3){
            this.main_screen!.innerHTML = '<img src = "./src/congrats.gif>"';
            await this.delay(4000);
            document.location.reload();
        }
        this.ally_digimon = new Rookie(this.ally_digimon);
        this.enemy_digimon = new Rookie(this.enemy_digimon);
        
        //alert("Congrats! This is your new " + this.ally_digimon.getName());
        this.atualiza_arena();
        
    }


    async you_lost(){
        this.main_screen!.innerHTML = '<img src = "./src/congrats.gif>';
        await this.delay(4000);
        document.location.reload();


    }

}

 
    /**
     * Window onload é a "main" do programa. É necessária, pois caso contrário o Javascript carregaria
     * Antes do HTML da página. Ou seja, o event listener do digivice nunca funcionaria, pois seria sempre nulo.
     */
window.onload = function main() {
   
    let pagina = new page(); 
    /**
     * A pagina de inicio do programa ja possui elementos HTML definidos. Ao criar e chamar uma nova pagina, tais
     * elementos são associados à pagina por seu id no construtor, e é possível então criar event listeners
     * em seus elementos.
     */           
    let call_event_one = ()=>{pagina.event_one()}; //associa a chamada de evento_um de página a uma variável
    pagina.digivice!.addEventListener("click", call_event_one); //cria um event_listener na imagem do digivice, que inicia o evento em call_event_one ao click.
    //pagina.digivice.removeEventListener("click", funcao);
}
