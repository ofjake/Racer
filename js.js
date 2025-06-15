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

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animate() {
            if (!isHovering) {
                const dx = (mouseX + 40) - menuX;
                const dy = (mouseY + 40) - menuY;
                
                menuX += dx * 0.05;
                menuY += dy * 0.05;
                
                cursorMenu.style.left = menuX - 30 + 'px';
                cursorMenu.style.top = menuY - 30 + 'px';
            }
            
            animationId = requestAnimationFrame(animate);
        }


        animate();
        
        function checkHover() {
            const rect = cursorMenu.getBoundingClientRect();
            const isOverCircle = mouseX >= rect.left && 
                                mouseX <= rect.right && 
                                mouseY >= rect.top && 
                                mouseY <= rect.bottom;
            
            if (isOverCircle && !isInRange && !isHovering) {
                isInRange = true;
                hoverTimeout = setTimeout(() => {
                    if (isInRange) {
                        isHovering = true;
                        cursorMenu.classList.add('expanded');
                    }
                }, 80);
            } else if (!isOverCircle && isInRange && !isHovering) {
                isInRange = false;
                clearTimeout(hoverTimeout);
            } else if (isHovering) {
                const expandedRect = cursorMenu.getBoundingClientRect();
                const isOverExpanded = mouseX >= expandedRect.left && 
                                     mouseX <= expandedRect.right && 
                                     mouseY >= expandedRect.top && 
                                     mouseY <= expandedRect.bottom;
                
                const originalLeft = expandedRect.left - 20;
                const originalTop = expandedRect.top - 20;
                const originalRight = originalLeft + 60;
                const originalBottom = originalTop + 60;
                
                const isOverOriginal = mouseX >= originalLeft && 
                                     mouseX <= originalRight && 
                                     mouseY >= originalTop && 
                                     mouseY <= originalBottom;
                
                if (!isOverExpanded && !isOverOriginal) {
                    isHovering = false;
                    isInRange = false;
                    clearTimeout(hoverTimeout);
                    cursorMenu.classList.remove('expanded');
                }
            }
        }

        setInterval(checkHover, 16);

        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Navigation clicked:', item.textContent);
            });
        });

        cursorMenu.style.left = '90px';
        cursorMenu.style.top = '90px';
        menuX = 120;
        menuY = 120;