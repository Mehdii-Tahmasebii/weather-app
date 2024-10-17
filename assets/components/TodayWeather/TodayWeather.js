
let template = document.createElement('template');
template.innerHTML = `
     <div class="bg-white/5 rounded-3xl px-7 py-5 ">
          <div class="border-b border-white/15 pb-5">


            <h5 class="text-xl">Now</h5>

            <!-- todays weather -->
            <div class="flex items-center gap-x-10">
              <div class="flex justify-center items-center">
                <slot name="today-temp" class="text-[78px]" data-today-temp>°</slot>

                <span class="-translate-y-1 text-5xl">c</span>
              </div>
              <slot name="today-img" ></slot>
              
            </div>

            <slot name="today-cloud"></slot>
          </div>
          <!-- ///todays weather -->
          <!-- date and location -->
          <div class="mt-5 font-semibold">
            <p class="flex items-center gap-2">
              <svg class="w-5 h-5 text-white">
                <use href="#calendar"></use>
              </svg>
              <slot name="today-weekday" class="capitalize text-white/25" 
                ></slot
              >
            </p>
            <p class="flex items-center gap-2">
              <svg class="w-5 h-5 text-white">
                <use href="#map-pin"></use>
              </svg>
              <slot
              name="city-name"
                class="capitalize text-white/25"
                
              ></slot>
                 <slot
              name="country"
                class="uppercase text-white/25"
                
              ></slot>
              
            </p>
          </div>
        </div>
`

class TodayWeather extends HTMLElement {

    constructor(){
        super()
        this.attachShadow({mode:'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

export default TodayWeather