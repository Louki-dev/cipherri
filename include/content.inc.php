
<div class="row">
<div class="col s12 m12">
    <div class="card-panel base-background z-depth-0">

    <!-- Tabs and Content -->
    <div class="row">
        <div class="col s12">
        <!-- TABS -->
        <ul class="tabs base-background mt-3">
            <li class="tab col s4"><a href="#all-items"><i class="bi bi-person-lines-fill"></i><span class="ml-2 hide-on-med-and-down">All Items</span></a></li>
            <li class="tab col s4"><a href="#social"><i class="bi bi-people-fill"></i><span class="ml-2 hide-on-med-and-down">Social</span></a></li>
            <li class="tab col s4"><a href="#others"><i class="bi bi-person-rolodex"></i><span class="ml-2 hide-on-med-and-down">Others</span></a></li>
        </ul>

        </div>
        <div id="all-items" class="col s12 white-text">
            <div class="row mt-3">
                <div id="all_items"></div>
                <p id="items-paginate" class="mt-3 right blue-grey-text text-lighten-3"></p>
            </div>
        </div>
        <div id="social" class="col s12 white-text">
            <div class="row mt-3">
                <div id="all_socials"></div>
                <p id="socials-paginate" class="mt-3 right blue-grey-text text-lighten-3"></p>
            </div>
        </div>
        <div id="others" class="col s12 white-text">
            <div class="row mt-3">
                <div id="all_others"></div>
                <p id="others-paginate" class="mt-3 right blue-grey-text text-lighten-3"></p>
            </div>
        </div>
    </div>
    
    </div>

</div>
</div>


<!-- Modal Buttons -->
<div id="item-modal-div" class="modal bottom-sheet">
  <div class="modal-content base-background">
    <div class="center-div">
    <!-- uid -->
    <input type="text" class="white-text hide" value="" id="view_id">
    <!-- Buttons -->
    <div class=" mr-2"><a class="btn-floating btn-large waves-effect waves-light base-background2 white_text-bg_hover modal-trigger modal-close" data-target="pin-account"><i class="bi bi-view-list fs-1 white-text to-m"></i></a><p class="white-text to-s center mt-1">View</p></div>
    <div class=" ml-2 mr-2"><a class="btn-floating btn-large waves-effect waves-light base-background2 white_text-bg_hover modal-trigger modal-close" data-target="pin-account_update"><i class="bi bi-pencil-square fs-1 white-text to-m"></i></a><p class="white-text  to-s center mt-1">Edit</p></div>
    <div class=" ml-2 mr-2"><a class="btn-floating btn-large waves-effect waves-light base-background2 white_text-bg_hover modal-trigger modal-close" data-target="pin-account_delete"><i class="bi bi-trash fs-1 white-text to-m"></i></a><p class="white-text to-s center mt-1">Delete</p></div>
    <div class=" ml-2"><a class="btn-floating btn-large waves-effect waves-light base-background2 white_text-bg_hover modal-close"><i class="bi bi-x-lg fs-1 white-text to-m"></i></a><p class="white-text to-s center mt-1">Close</p></div>
    </div>
  </div>
</div>

