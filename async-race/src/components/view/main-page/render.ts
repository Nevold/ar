export function render(): void {
  const root = document.createElement('div');
  root.classList.add('root');
  document.body.append(root);

  const innerHtml = `
    <div class="menu">
    <button class="button menu-button active-menu-button active-button" id="garage-menu">To garage</button>
    <button class="button menu-button active-menu-button" id="winner-menu">To winners</button>
  </div>
  <div id="garage-page">
    <div class="winner-message"></div>  
    <div>
      <form class="form" id="create-cars">
        <input class="input create-name" id="create-name" name="name" type="text" autocomplete="off" />
        <input class="input create-color" id="create-color" name="color" type="color" value="#ffffff" />
        <button class="button create-submit" id="create-submit" type="submit">Create</button>
      </form>
      <form class="form" id="update-cars">
        <input class="input update-name" id="update-name" name="name" type="text" autocomplete="off" disabled />
        <input class="input update-color" id="update-color" name="color" type="color" value="#ffffff" disabled />
        <button class="button update-submit" id="update-submit" type="submit">Update</button>
      </form>
    </div>
    <div class="drive-control">
      <button class="button menu-button active-button race" id="race">Race</button>
      <button class="button menu-button reset" id="reset" disabled>Reset</button>
      <button class="button generate" id="generate">Generate cars</button>
    </div>
    <div id="garage">
    </div>
    <div><p class="message" id="message"></p></div>
  </div>
  <div class="disable-page" id="winner"></div>
    <div class="pagination">
      <button class="button menu-button prev-btn" id="prev">Prev</button>
      <button class="button menu-button next-btn" id="next">Next</button>
    </div>
    `;

  root.insertAdjacentHTML('afterbegin', innerHtml);
}
