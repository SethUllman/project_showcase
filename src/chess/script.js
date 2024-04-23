document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('chessboard');
    if (!canvas) {
        console.error("Canvas element not found.");
        return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error("2D context not supported.");
        return;
    }

    const tileSize = canvas.width / 8;

    // Draw the chessboard
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            if ((row + col) % 2 === 0) {
                ctx.fillStyle = '#F0D9B5'; // Tan color for light squares
            } else {
                ctx.fillStyle = '#8CA96B'; // Green color for dark squares
            }
            ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
        }
    }

    // Draw the pieces (for testing purposes)
    // ctx.fillStyle = '#000000';
    // ctx.font = '40px Arial';
    // ctx.fillText('♖', 0 * tileSize + 10, 0 * tileSize + 40); // Example: Rook at position (0, 0)
});
