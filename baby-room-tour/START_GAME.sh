#!/bin/bash
echo "========================================"
echo "  Baby Room Tour - Starting Game..."
echo "========================================"
echo ""
echo "Game will open at: http://localhost:8080"
echo "Press Ctrl+C to stop the server"
echo ""

cd "$(dirname "$0")"

# Try to open browser
if command -v xdg-open > /dev/null; then
    xdg-open http://localhost:8080 &
elif command -v open > /dev/null; then
    open http://localhost:8080 &
fi

# Start Python HTTP server
if command -v python3 > /dev/null; then
    python3 -m http.server 8080
elif command -v python > /dev/null; then
    python -m http.server 8080
else
    echo "Error: Python not found. Please install Python to run this server."
    exit 1
fi
