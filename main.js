const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const PLAYER_STORAGE_KEY = "LINHKA_PLAYER";

const cd = $('.cd')
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const player = $('.player')
const playBtn = $('.btn-toggle-play')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn =$('.btn-random')
const repeatBtn =$('.btn-repeat')
const playlist = $('.playlist')

const app =  {
    currentIndex: 0,
    isPlaying: false,
    isRandom:false,
    isRepeat:false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    songs: [
        {
          name: "Hãy Trao Cho Anh",
          singer: "Sơn Tùng M-TP",
          path: "./audio/HayTraoChoAnhRonboogzRemix-SonTungMTPSnoopDogg-6034353.mp3",
          image: "https://avatar-ex-swe.nixcdn.com/playlist/2019/07/29/0/a/d/1/1564373325671_500.jpg"
        },
        {
          name: "Lạc Trôi",
          singer: "Sơn Tùng M-TP",
          path: "./audio/LacTroiTripleDRemix-SonTungMTP-5164670.mp3",
          image:"https://avatar-ex-swe.nixcdn.com/playlist/2017/09/08/d/8/2/b/1504878126583_500.jpg"
        },
        {
          name: "Chúng Ta Của Hiện Tại (Lofi)",
          singer: "Sơn Tùng M-TP",
          path:"./audio/ChungTaCuaHienTaiLofiVersion-SonTungMTPTuyenVu-6963525.mp3",
          image: "https://avatar-ex-swe.nixcdn.com/song/2021/03/11/b/c/6/1/1615451680715_500.jpg"
        },
        {
          name: "Cưới Thôi",
          singer: "Masew x B Ray,",
          path: "./audio/CuoiThoi-MasewMasiuBRayTAPVietNam-7085648.mp3",
          image:"https://avatar-ex-swe.nixcdn.com/song/2021/09/09/f/c/f/d/1631181753902_500.jpg"
        },
        {
          name: "Độ Tộc 2",
          singer: " Masew, Độ Mixi, Phúc Du",
          path: "./audio/DoToc2-MasewDoMixiPhucDuPhao-7064730.mp3",
          image:"https://avatar-ex-swe.nixcdn.com/song/2021/08/10/b/2/e/0/1628579601228_500.jpg"
        },
        {
          name: "Nguyên Team Đi vào Hết",
          singer: "Binz",
          path: "./audio/Nguyen-Team-Di-Vao-Het-Binz.mp3",
          image:"https://i1.sndcdn.com/artworks-LcQMjscAJ84L-0-t500x500.jpg"
        },
        {
            name: "Cưới Đi",
            singer: " 2T, ChangC",
            path: "./audio/CuoiDiYangRemix-2TChangC-7058878_hq.mp3",
            image:"https://avatar-ex-swe.nixcdn.com/song/2021/08/02/d/9/d/d/1627893310393_500.jpg"
        },
        {
            name: "Nàng Thơ (Lofi Chill)",
            singer: "  Hoàng Dũng",
            path: "./audio/NangThoLofiVersion-HoangDungTheVoiceFreakD-6871593.mp3",
            image:"https://avatar-ex-swe.nixcdn.com/song/2020/12/17/8/f/5/1/1608170551470_500.jpg"
        },
        {
            name: "Ex's Hate Me (Part 2)",
            singer: "  B Ray, Masew, AMEE",
            path: "./audio/ExsHateMePart2MasewRemix-BRayMasewAMee-6952158.mp3",
            image:"https://avatar-ex-swe.nixcdn.com/song/2021/03/01/e/2/3/c/1614598962860_500.jpg"
        },
        {
            name: "Missing You",
            singer: "Phương Ly",
            path: "./audio/Missing You - Phuong Ly_ Tinle.mp3",
            image:"https://data.chiasenhac.com/data/cover/126/125981.jpg"
        },
        {
            name: "Nàng Thơ (Lofi Chill)",
            singer: "  Hoàng Dũng",
            path: "./audio/NangThoLofiVersion-HoangDungTheVoiceFreakD-6871593.mp3",
            image:"https://avatar-ex-swe.nixcdn.com/song/2020/12/17/8/f/5/1/1608170551470_500.jpg"
        },
        {
          name: "Gene",
          singer: "Binz",
          path: "./audio/Gene-Binz-Touliver.mp3",
          image: "https://images.genius.com/3c506ee1345896867442bcd49fcf97d3.500x500x1.jpg"
        }
    ],
    setConfig: function (key, value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
      },
    render: function () {
        const htmls = this.songs.map((song, index) => {
          return `
                    <div class="song ${index === this.currentIndex ? "active" : ""}" data-index="${index}">
                        <div class="thumb"
                            style="background-image: url('${song.image}')">
                        </div>
                        <div class="body">
                            <h3 class="title">${song.name}</h3>
                            <p class="author">${song.singer}</p>
                        </div>
                        <div class="option">
                            <i class="fas fa-ellipsis-h"></i>
                        </div>
                    </div>
                `;
        });
        playlist.innerHTML = htmls.join("");
    },
    defineProperties: function () {
        Object.defineProperty(this, "currentSong",{
            get: function () {
                return this.songs[this.currentIndex];
            }
        });
    },

    handleEvents: function () {
        const _this = this
        const cdWidth = cd.offsetWidth

        const cdThumbAnimate = cdThumb.animate([
            {transform: 'rotate(360deg)'}
        ],{
            duration:10000,
            iterations: Infinity
        })
        cdThumbAnimate.pause()

        document.onscroll = function(){
            const scrollTop = window.scrollY
            const newCdWidth = cdWidth - scrollTop

            cd.style.width = newCdWidth>0 ? newCdWidth + 'px' :0
            cd.style.opacity = newCdWidth / cdWidth 
        }

        playBtn.onclick = function(){
            if(_this.isPlaying){
                audio.pause()
            }else{                
                audio.play()
            }           
        }

        audio.onplay = function(){
            _this.isPlaying = true
            player.classList.add('playing')
            cdThumbAnimate.play()
        }
        audio.onpause = function(){
            _this.isPlaying = false
            player.classList.remove('playing')
            cdThumbAnimate.pause()
        }

        audio.ontimeupdate = function(){
            if(audio.duration){
                const progressPercent = Math.floor(audio.currentTime / audio.duration *100)
                progress.value=progressPercent
            }
        }

        progress.onchange = function(e){
            const seekTime = audio.duration/100 * e.target.value   
            audio.currentTime = seekTime         
        }

        nextBtn.onclick = function(){
            if(_this.isRandom){
                _this.playRandomSong()
            }else{
                _this.nextSong()
            }
            audio.play()

            _this.render()
            _this.scollToActiveSong()
        }
        prevBtn.onclick = function(){
            if(_this.isRandom){
                _this.playRandomSong()
            }else{
                _this.prevSong()
            }            
            audio.play()
            _this.scollToActiveSong()
        }

        randomBtn.onclick = function(e){
            _this.isRandom = !_this.isRandom
            _this.setConfig("isRandom", _this.isRandom);
            randomBtn.classList.toggle('active',_this.isRandom)           
        }

        repeatBtn.onclick = function(e){
            _this.isRepeat = !_this.isRepeat
            _this.setConfig("isRepeat", _this.isRepeat);
            repeatBtn.classList.toggle('active',_this.isRepeat)           
        }
        
        audio.onended = function(){
            if(_this.isRepeat){
                audio.play()
            }else{
                nextBtn.click()
            }
        }

        playlist.onclick = function(e){
            const songNode = e.target.closest('.song:not(.active)')
            if( songNode || e.target.closest('.option') ){
                if(songNode){
                    _this.currentIndex = Number(songNode.dataset.index)
                    _this.loadCurrentSong()
                    audio.play()
                    _this.render()
                }
            }
        }
    },

    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage= `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
    },

    loadConfig: function () {
        this.isRandom = this.config.isRandom;
        this.isRepeat = this.config.isRepeat;
      },

    nextSong: function(){
        this.currentIndex++;
        if(this.currentIndex >= this.songs.length ){
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },

    prevSong: function(){
        this.currentIndex--;
        if(this.currentIndex <0 ){
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()
    },

    playRandomSong: function(){
        let newIndex
        do{
            newIndex = Math.floor(Math.random() * this.songs.length)
        }while(newIndex===this.currentIndex)

        this.currentIndex = newIndex
        this.loadCurrentSong()
    },

    scollToActiveSong: function(){
      setTimeout(() => {
          if(this.currentIndex < 3){
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'end'
            })
          }else{
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            })
          }
      },300)
    },

    start: function(){
        this.loadConfig();

        this.defineProperties()

        this.handleEvents()

        this.loadCurrentSong()

        this.render()

        randomBtn.classList.toggle("active", this.isRandom);
        repeatBtn.classList.toggle("active", this.isRepeat);
    }
}

app.start();