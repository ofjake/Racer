 let mouseX = 0;
        let mouseY = 0;
        let menuX = 0;
        let menuY = 0;
        let isHovering = false;
        let animationId;
        let hoverTimeout = null;
        let isInRange = false;

        const customCursor = document.getElementById('customCursor');
        const cursorMenu = document.getElementById('cursorMenu');

        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Animation loop for smooth trailing
        function animate() {
            if (!isHovering) {
                // Smooth trailing effect with easing and offset
                const dx = (mouseX + 40) - menuX; // 40px offset to bottom-right of cursor
                const dy = (mouseY + 40) - menuY; // 40px offset to bottom-right of cursor
                
                menuX += dx * 0.05; // Smoother trailing speed
                menuY += dy * 0.05;
                
                cursorMenu.style.left = menuX - 30 + 'px';
                cursorMenu.style.top = menuY - 30 + 'px';
            }
            
            animationId = requestAnimationFrame(animate);
        }

        // Start animation
        animate();

        // Check if cursor is directly over the circle
        function checkHover() {
            const rect = cursorMenu.getBoundingClientRect();
            const isOverCircle = mouseX >= rect.left && 
                                mouseX <= rect.right && 
                                mouseY >= rect.top && 
                                mouseY <= rect.bottom;
            
            if (isOverCircle && !isInRange && !isHovering) {
                // Mouse is over circle, start delay timer
                isInRange = true;
                hoverTimeout = setTimeout(() => {
                    if (isInRange) {
                        isHovering = true;
                        cursorMenu.classList.add('expanded');
                    }
                }, 80); // 0.5 second delay
            } else if (!isOverCircle && isInRange && !isHovering) {
                // Mouse left circle before delay completed
                isInRange = false;
                clearTimeout(hoverTimeout);
            } else if (isHovering) {
                // Check if mouse is over expanded menu or original circle position
                const expandedRect = cursorMenu.getBoundingClientRect();
                const isOverExpanded = mouseX >= expandedRect.left && 
                                     mouseX <= expandedRect.right && 
                                     mouseY >= expandedRect.top && 
                                     mouseY <= expandedRect.bottom;
                
                // Also check original circle position (accounting for transform)
                const originalLeft = expandedRect.left - 20;
                const originalTop = expandedRect.top - 20;
                const originalRight = originalLeft + 60;
                const originalBottom = originalTop + 60;
                
                const isOverOriginal = mouseX >= originalLeft && 
                                     mouseX <= originalRight && 
                                     mouseY >= originalTop && 
                                     mouseY <= originalBottom;
                
                if (!isOverExpanded && !isOverOriginal) {
                    // Mouse is not over menu or original position, close menu
                    isHovering = false;
                    isInRange = false;
                    clearTimeout(hoverTimeout);
                    cursorMenu.classList.remove('expanded');
                }
            }
        }

        // Check hover continuously
        setInterval(checkHover, 16); // ~60fps

        // Handle nav item clicks
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Navigation clicked:', item.textContent);
                // Add your navigation logic here
            });
        });

        // Initialize menu position with bottom-right offset
        cursorMenu.style.left = '90px';
        cursorMenu.style.top = '90px';
        menuX = 120;
        menuY = 120;