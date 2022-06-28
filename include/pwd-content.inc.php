<div>
<div class="mt-5 container mb-5">
<div class="animate__animated animate__fadeIn">

<div class="row">
    <form class="col s12 rounded base-background2 py-1">
    <span class="white-text to-m fs-1">Password Generator</span>

    <div class="row mt-3">
    <div class="input-field col s12">
        <a class="">
        <!-- <p class="white-text center flow-text" id="display_pwd"></p> -->
        <input type="text" class="white-text center fs-1" id="display_pwd" value="" disabled/>
        </a>
        <div class="progress mt-3 base-background rounded" style="padding: 7px;">
            <div class="determinate" id="pwd_indicator"></div>
        </div>
    </div>
    </div>
    
    <p class="white-text to-m">Password Length:<span class="ml-2" id="pwd_length">25</span></p>
    <p class="range-field" style="padding: 10px;">
        <input type="range" min="0" max="50" class="" id="slider" />
    </p>

    <div class="row">
        <div class="col s6">
            <p class="white-text to-m mt-3">Specified Options</p>
            <p class="mt-1">
                <label>
                    <input type="checkbox" id="upper"/>
                    <span>A - Z</span>
                </label>
            </p>
            <p class="mt-1">
                <label>
                    <input type="checkbox" id="lower"/>
                    <span>a - z</span>
                </label>
            </p>
            <p class="mt-1">
                <label>
                    <input type="checkbox" id="number"/>
                    <span>0 - 9</span>
                </label>
            </p>
            <p class="mt-1">
                <label>
                    <input type="checkbox" id="symbol"/>
                    <span>Special</span>
                </label>
            </p>
        </div>
    </div>
    
    <a class="btn rounded-custom base-primary black-text mt-3" id="copyPwd">Copy</a>
    </form>
</div>


</div>
</div>
</div>