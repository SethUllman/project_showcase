// Chess.js
import React, { useEffect, useRef, useState } from 'react';

function Chess() {
    const canvasRef = useRef(null);
    const tileSize = 50; // Size of each square in pixels
    const pieceSize = 40; // Size of each piece in pixels
    const clickBoxSize = 60; // Size of the clickable area around the piece

    const [draggingPiece, setDraggingPiece] = useState(null);
    const [piecePosition, setPiecePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

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
        ctx.fillStyle = '#000000';
        ctx.font = `${pieceSize}px Arial`;
        ctx.fillText('♖', 0 * tileSize + (tileSize - pieceSize) / 2, 0 * tileSize + (tileSize + pieceSize) / 2); // Example: Rook at position (0, 0)

        // Mouse event handlers
        canvas.addEventListener('mousedown', handleMouseDown);
        canvas.addEventListener('mouseup', handleMouseUp);

        return () => {
            // Clean up event listeners
            canvas.removeEventListener('mousedown', handleMouseDown);
            canvas.removeEventListener('mouseup', handleMouseUp);
        };
    }, []); // Empty dependency array ensures the effect runs only once, similar to componentDidMount

    function handleMouseDown(event) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        // Check if the mouse click is on the piece or within the clickable area
        // For simplicity, let's assume the piece is always clicked at position (0, 0)
        const pieceX = 0 * tileSize + (tileSize - pieceSize) / 2;
        const pieceY = 0 * tileSize + (tileSize + pieceSize) / 2;
        if (
            mouseX >= pieceX - (clickBoxSize - pieceSize) / 2 &&
            mouseX <= pieceX + (clickBoxSize + pieceSize) / 2 &&
            mouseY >= pieceY - (clickBoxSize - pieceSize) / 2 &&
            mouseY <= pieceY + (clickBoxSize + pieceSize) / 2
        ) {
            // Toggle dragging state and update piece position
            if (draggingPiece === null) {
                setDraggingPiece('♖');
            } else {
                setDraggingPiece(null);
            }
        }
    }

    function handleMouseUp(event) {
        // If a piece is being dragged, drop it when mouse is released
        if (draggingPiece !== null) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            const rect = canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;

            // Calculate the position to drop the piece
            const dropPosition = {
                x: Math.floor(mouseX / tileSize) * tileSize + (tileSize - pieceSize) / 2,
                y: Math.floor(mouseY / tileSize) * tileSize + (tileSize + pieceSize) / 2
            };

            // Update piece position and reset dragging state
            setPiecePosition(dropPosition);
            setDraggingPiece(null);
        }
    }

    function handleMouseMove(event) {
        // Update piece position while dragging
        if (draggingPiece !== null) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            const rect = canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;
            setPiecePosition({ x: mouseX - pieceSize / 2, y: mouseY - pieceSize / 2 });
        }
    }

    return (
        <div className="chess">
            <canvas ref={canvasRef} width={tileSize * 8} height={tileSize * 8} onMouseMove={handleMouseMove}></canvas>
        </div>
    );
}

export default Chess;
