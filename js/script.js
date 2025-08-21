// Document ready function
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme toggle
    initThemeToggle();

    // Initialize charts
    initCharts();

    // Initialize data table
    initDataTable();
});

// Theme Toggle Function
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Check for saved theme preference or default to light theme
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        body.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-theme');

        // Update icon based on current theme
        if (body.classList.contains('dark-theme')) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        }

        // Update charts with new theme
        updateChartsTheme();
    });
}

// Initialize Charts
function initCharts() {
    // Sales Chart
    const salesCtx = document.getElementById('salesChart').getContext('2d');
    window.salesChart = new Chart(salesCtx, {
        type: 'line',
        data: {
            labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو'],
            datasets: [{
                label: 'مبيعات 2023',
                data: [6500, 5900, 8000, 8100, 5600, 9500, 10000],
                backgroundColor: 'rgba(78, 115, 223, 0.2)',
                borderColor: 'rgba(78, 115, 223, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(78, 115, 223, 1)',
                tension: 0.3
            }, {
                label: 'مبيعات 2024',
                data: [7500, 6900, 9000, 9100, 7600, 10500, 12000],
                backgroundColor: 'rgba(28, 200, 138, 0.2)',
                borderColor: 'rgba(28, 200, 138, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(28, 200, 138, 1)',
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        font: {
                            family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                            size: 12
                        },
                        usePointStyle: true
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    titleFont: {
                        family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                        size: 14
                    },
                    bodyFont: {
                        family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                        size: 13
                    },
                    padding: 10,
                    cornerRadius: 4
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        font: {
                            family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
                        }
                    }
                }
            }
        }
    });

    // Products Chart
    const productsCtx = document.getElementById('productsChart').getContext('2d');
    window.productsChart = new Chart(productsCtx, {
        type: 'doughnut',
        data: {
            labels: ['إلكترونيات', 'ملابس', 'أغذية', 'أثاث', 'كتب'],
            datasets: [{
                data: [30, 25, 20, 15, 10],
                backgroundColor: [
                    'rgba(78, 115, 223, 0.8)',
                    'rgba(28, 200, 138, 0.8)',
                    'rgba(246, 194, 62, 0.8)',
                    'rgba(231, 74, 59, 0.8)',
                    'rgba(54, 185, 204, 0.8)'
                ],
                borderColor: [
                    'rgba(78, 115, 223, 1)',
                    'rgba(28, 200, 138, 1)',
                    'rgba(246, 194, 62, 1)',
                    'rgba(231, 74, 59, 1)',
                    'rgba(54, 185, 204, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        font: {
                            family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                            size: 12
                        },
                        usePointStyle: true,
                        padding: 15
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    titleFont: {
                        family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                        size: 14
                    },
                    bodyFont: {
                        family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                        size: 13
                    },
                    padding: 10,
                    cornerRadius: 4,
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.raw + '%';
                        }
                    }
                }
            },
            cutout: '60%'
        }
    });
}

// Update Charts Theme
function updateChartsTheme() {
    const isDarkTheme = document.body.classList.contains('dark-theme');
    const textColor = isDarkTheme ? '#d1d5db' : '#5a5c69';
    const gridColor = isDarkTheme ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)';

    // Update Sales Chart
    if (window.salesChart) {
        window.salesChart.options.plugins.legend.labels.color = textColor;
        window.salesChart.options.scales.y.ticks.color = textColor;
        window.salesChart.options.scales.x.ticks.color = textColor;
        window.salesChart.options.scales.y.grid.color = gridColor;
        window.salesChart.update();
    }

    // Update Products Chart
    if (window.productsChart) {
        window.productsChart.options.plugins.legend.labels.color = textColor;
        window.productsChart.update();
    }
}

// Initialize Data Table
function initDataTable() {
    // Sample data
    const tableData = [
        { id: 1, name: 'أحمد محمد', email: 'ahmed@example.com', role: 'مدير', status: 'active', date: '2023-01-15' },
        { id: 2, name: 'فاطمة علي', email: 'fatima@example.com', role: 'مستخدم', status: 'active', date: '2023-02-20' },
        { id: 3, name: 'محمد خالد', email: 'mohammed@example.com', role: 'محرر', status: 'inactive', date: '2023-03-10' },
        { id: 4, name: 'سارة أحمد', email: 'sara@example.com', role: 'مستخدم', status: 'active', date: '2023-04-05' },
        { id: 5, name: 'عمر حسن', email: 'omar@example.com', role: 'مدير', status: 'active', date: '2023-05-12' },
        { id: 6, name: 'نورا سعيد', email: 'nora@example.com', role: 'مستخدم', status: 'inactive', date: '2023-06-18' },
        { id: 7, name: 'خالد عبدالله', email: 'khalid@example.com', role: 'محرر', status: 'active', date: '2023-07-22' },
        { id: 8, name: 'مريم يوسف', email: 'mariam@example.com', role: 'مستخدم', status: 'active', date: '2023-08-30' },
        { id: 9, name: 'عبدالله محمود', email: 'abdullah@example.com', role: 'مدير', status: 'inactive', date: '2023-09-14' },
        { id: 10, name: 'آمنة صالح', email: 'amena@example.com', role: 'مستخدم', status: 'active', date: '2023-10-08' },
        { id: 11, name: 'ياسر محمد', email: 'yaser@example.com', role: 'محرر', status: 'active', date: '2023-11-25' },
        { id: 12, name: 'هدى إبراهيم', email: 'hoda@example.com', role: 'مستخدم', status: 'inactive', date: '2023-12-01' },
        { id: 13, name: 'سامي عبدالرحمن', email: 'sami@example.com', role: 'مدير', status: 'active', date: '2024-01-10' },
        { id: 14, name: 'ليلى أحمد', email: 'layla@example.com', role: 'مستخدم', status: 'active', date: '2024-01-15' },
        { id: 15, name: 'فهد سالم', email: 'fahad@example.com', role: 'محرر', status: 'inactive', date: '2024-01-20' },
        { id: 16, name: 'نجاة محمود', email: 'najat@example.com', role: 'مستخدم', status: 'active', date: '2024-01-25' },
        { id: 17, name: 'باسل يوسف', email: 'basel@example.com', role: 'مدير', status: 'active', date: '2024-02-01' },
        { id: 18, name: 'سعاد عبدالله', email: 'suad@example.com', role: 'مستخدم', status: 'inactive', date: '2024-02-05' },
        { id: 19, name: 'رشيد علي', email: 'rashid@example.com', role: 'محرر', status: 'active', date: '2024-02-10' },
        { id: 20, name: 'أمل خالد', email: 'amal@example.com', role: 'مستخدم', status: 'active', date: '2024-02-15' },
        { id: 21, name: 'طارق حسن', email: 'tareq@example.com', role: 'مدير', status: 'inactive', date: '2024-02-20' },
        { id: 22, name: 'نادية محمد', email: 'nadia@example.com', role: 'مستخدم', status: 'active', date: '2024-02-25' },
        { id: 23, name: 'جمال سعيد', email: 'jamal@example.com', role: 'محرر', status: 'active', date: '2024-03-01' },
        { id: 24, name: 'سوسن أحمد', email: 'sosn@example.com', role: 'مستخدم', status: 'inactive', date: '2024-03-05' },
        { id: 25, name: 'أيمن عبدالله', email: 'ayman@example.com', role: 'مدير', status: 'active', date: '2024-03-10' },
        { id: 26, name: 'فريدة محمود', email: 'freeda@example.com', role: 'مستخدم', status: 'active', date: '2024-03-15' },
        { id: 27, name: 'صالح يوسف', email: 'saleh@example.com', role: 'محرر', status: 'inactive', date: '2024-03-20' },
        { id: 28, name: 'عائشة علي', email: 'aisha@example.com', role: 'مستخدم', status: 'active', date: '2024-03-25' },
        { id: 29, name: 'أنس خالد', email: 'anas@example.com', role: 'مدير', status: 'active', date: '2024-04-01' },
        { id: 30, name: 'زينب حسن', email: 'zeinab@example.com', role: 'مستخدم', status: 'inactive', date: '2024-04-05' },
        { id: 31, name: 'هاني سالم', email: 'hani@example.com', role: 'محرر', status: 'active', date: '2024-04-10' },
        { id: 32, name: 'رنا عبدالله', email: 'rana@example.com', role: 'مستخدم', status: 'active', date: '2024-04-15' },
        { id: 33, name: 'مأمون محمد', email: 'mamoun@example.com', role: 'مدير', status: 'inactive', date: '2024-04-20' },
        { id: 34, name: 'سمر أحمد', email: 'samar@example.com', role: 'مستخدم', status: 'active', date: '2024-04-25' },
        { id: 35, name: 'بشار علي', email: 'bashar@example.com', role: 'محرر', status: 'active', date: '2024-05-01' },
        { id: 36, name: 'إيمان خالد', email: 'eman@example.com', role: 'مستخدم', status: 'inactive', date: '2024-05-05' },
        { id: 37, name: 'نصري يوسف', email: 'nasri@example.com', role: 'مدير', status: 'active', date: '2024-05-10' },
        { id: 38, name: 'داليا محمود', email: 'dalia@example.com', role: 'مستخدم', status: 'active', date: '2024-05-15' },
        { id: 39, name: 'عادل سعيد', email: 'adel@example.com', role: 'محرر', status: 'inactive', date: '2024-05-20' },
        { id: 40, name: 'مي سالم', email: 'mai@example.com', role: 'مستخدم', status: 'active', date: '2024-05-25' },
        { id: 41, name: 'سفيان عبدالله', email: 'sufian@example.com', role: 'مدير', status: 'active', date: '2024-06-01' },
        { id: 42, name: 'ريم أحمد', email: 'reem@example.com', role: 'مستخدم', status: 'inactive', date: '2024-06-05' },
        { id: 43, name: 'فارس محمد', email: 'faris@example.com', role: 'محرر', status: 'active', date: '2024-06-10' },
        { id: 44, name: 'شيرين علي', email: 'shereen@example.com', role: 'مستخدم', status: 'active', date: '2024-06-15' },
        { id: 45, name: 'جمال خالد', email: 'gamal@example.com', role: 'مدير', status: 'inactive', date: '2024-06-20' },
        { id: 46, name: 'نادين يوسف', email: 'nadine@example.com', role: 'مستخدم', status: 'active', date: '2024-06-25' },
        { id: 47, name: 'مروان حسن', email: 'marwan@example.com', role: 'محرر', status: 'active', date: '2024-07-01' },
        { id: 48, name: 'سارة محمود', email: 'sara2@example.com', role: 'مستخدم', status: 'inactive', date: '2024-07-05' },
        { id: 49, name: 'بسام سعيد', email: 'basam@example.com', role: 'مدير', status: 'active', date: '2024-07-10' },
        { id: 50, name: 'ليلى أحمد', email: 'layla2@example.com', role: 'مستخدم', status: 'active', date: '2024-07-15' }
    ];

    // Set up pagination variables
    let currentPage = 1;
    const recordsPerPage = 10;
    let filteredData = [...tableData];

    // Get table elements
    const tableBody = document.querySelector('#data-table tbody');
    const tableSearch = document.getElementById('table-search');
    const tableFilter = document.getElementById('table-filter');
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');
    const pageNumbers = document.getElementById('page-numbers');
    const startRecord = document.getElementById('start-record');
    const endRecord = document.getElementById('end-record');
    const totalRecords = document.getElementById('total-records');

    // Initialize table
    renderTable();
    renderPagination();

    // Search functionality
    tableSearch.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        filteredData = tableData.filter(item => {
            return (
                item.name.toLowerCase().includes(searchTerm) ||
                item.email.toLowerCase().includes(searchTerm) ||
                item.role.toLowerCase().includes(searchTerm) ||
                item.status.toLowerCase().includes(searchTerm)
            );
        });
        currentPage = 1;
        renderTable();
        renderPagination();
    });

    // Filter functionality
    tableFilter.addEventListener('change', function() {
        const filterValue = this.value;
        if (filterValue === 'all') {
            filteredData = [...tableData];
        } else {
            filteredData = tableData.filter(item => item.status === filterValue);
        }
        currentPage = 1;
        renderTable();
        renderPagination();
    });

    // Pagination functionality
    prevPageBtn.addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            renderTable();
            renderPagination();
        }
    });

    nextPageBtn.addEventListener('click', function() {
        const totalPages = Math.ceil(filteredData.length / recordsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderTable();
            renderPagination();
        }
    });

    // Render table function
    function renderTable() {
        // Calculate start and end index for current page
        const startIndex = (currentPage - 1) * recordsPerPage;
        const endIndex = startIndex + recordsPerPage;
        const currentData = filteredData.slice(startIndex, endIndex);

        // Clear table body
        tableBody.innerHTML = '';

        // Add rows to table body
        currentData.forEach(item => {
            const row = document.createElement('tr');

            // Format date
            const date = new Date(item.date);
            const formattedDate = date.toLocaleDateString('ar-SA', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });

            // Set row content
            row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.email}</td>
                <td>${item.role}</td>
                <td><span class="status-badge ${item.status}">${item.status === 'active' ? 'نشط' : 'غير نشط'}</span></td>
                <td>${formattedDate}</td>
                <td>
                    <div class="action-buttons">
                        <button class="edit" title="تعديل"><i class="fas fa-edit"></i></button>
                        <button class="delete" title="حذف"><i class="fas fa-trash-alt"></i></button>
                    </div>
                </td>
            `;

            // Add row to table body
            tableBody.appendChild(row);
        });

        // Update pagination info
        startRecord.textContent = filteredData.length > 0 ? startIndex + 1 : 0;
        endRecord.textContent = Math.min(endIndex, filteredData.length);
        totalRecords.textContent = filteredData.length;
    }

    // Render pagination function
    function renderPagination() {
        const totalPages = Math.ceil(filteredData.length / recordsPerPage);

        // Update prev/next buttons
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage === totalPages || totalPages === 0;

        // Clear page numbers
        pageNumbers.innerHTML = '';

        // Add page numbers
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            const pageNumber = document.createElement('div');
            pageNumber.classList.add('page-number');
            if (i === currentPage) {
                pageNumber.classList.add('active');
            }
            pageNumber.textContent = i;

            pageNumber.addEventListener('click', function() {
                currentPage = i;
                renderTable();
                renderPagination();
            });

            pageNumbers.appendChild(pageNumber);
        }
    }
}