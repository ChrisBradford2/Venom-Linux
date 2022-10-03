console.log("Hello, ESGI!")

/**
 * Custom right click
 *
 * @param {object} ctx
 * @param {Request} ctx.request
 * @param {Response} ctx.response
 */
const contextMenu = document.getElementById("context-menu");
const scope = document.querySelector("body");

// Prevent the menu from going out of bounds.
const normalizePosition = (mouseX, mouseY) => {
    const {
        left: scopeOffsetX,
        top: scopeOffsetY,
    } = scope.getBoundingClientRect();

    const scopeX = mouseX - scopeOffsetX;
    const scopeY = mouseY - scopeOffsetY;

    const outOfBoundsOnX = scopeX + contextMenu.clientWidth> scope.clientWidth;
    const  outOfBoundsOnY = scopeY + contextMenu.clientHeight > scope.clientHeight;

    let normalizedX = mouseX;
    let normalizedY = mouseY;

    // Normalize on X
    if (outOfBoundsOnX) {
        normalizedX = scopeOffsetX + scope.clientWidth - contextMenu.clientWidth;
    }

    // Normalize on Y
    if (outOfBoundsOnY) {
        normalizedY = scopeOffsetY + scope.clientHeight - contextMenu.clientHeight;
    }

    return { normalizedX, normalizedY };
};

// Display the menu only on right-click.
scope.addEventListener("contextmenu", (event) => {
    event.preventDefault();

    const { offsetX: mouseX, offsetY: mouseY } = event;

    const { normalizedX, normalizedY } = normalizePosition(mouseX, mouseY);

    contextMenu.style.top = `${normalizedY}px`;
    contextMenu.style.left = `${normalizedX}px`;

    contextMenu.classList.remove("visible");

    setTimeout(() => {
        contextMenu.classList.add("visible");
    });
});

// Close the menu when the user clicks outside.
scope.addEventListener("click", (e) => {
    if (e.target.offsetParent !== contextMenu) {
        contextMenu.classList.remove("visible");
    }
})
