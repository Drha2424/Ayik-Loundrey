const API_URL = '/api';

lucide.createIcons();

async function fetchAPI(endpoint) {
    try {
        const response = await fetch(`${API_URL}${endpoint}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('API Error:', error);
        return { data: [] };
    }
}

async function loadData() {
    try {
        const [paketRes, layananRes, orderanRes] = await Promise.all([
            fetchAPI('/paket'),
            fetchAPI('/layanan'),
            fetchAPI('/orderan')
        ]);

        // Render Paket
        const paketContainer = document.getElementById('paket-container');
        if (paketRes.data.length > 0) {
            paketContainer.innerHTML = paketRes.data.map((p, index) => {
                let imgSrc = '';
                const nameLow = p.nama_paket.toLowerCase();
                
                if (nameLow.includes('super express')) {
                    imgSrc = 'asset-logo/se vektor.png';
                } else if (nameLow.includes('express')) {
                    imgSrc = 'asset-logo/e vektor.png';
                } else if (nameLow.includes('normal')) {
                    imgSrc = 'asset-logo/n vektor.png';
                }
                
                return `
                <div class="paket-card">
                    <div class="icon-wrapper">
                        <img src="${imgSrc}" alt="${p.nama_paket}" style="width: 32px; height: 32px; object-fit: contain;">
                    </div>
                    <div class="paket-name">${p.nama_paket}</div>
                    <div class="paket-duration">${p.durasi_jam} Hours</div>
                </div>
                `;
            }).join('');
        } else {
            paketContainer.innerHTML = '<div style="font-size:0.85rem; color:var(--text-muted)">Belum ada paket</div>';
        }

        // Render Layanan
        const layananContainer = document.getElementById('layanan-container');
        if (layananRes.data.length > 0) {
            layananContainer.innerHTML = layananRes.data.map((l, index) => {
                let imgSrc = '';
                const nameLow = l.nama_layanan.toLowerCase();
                
                if (nameLow.includes('cuci setrika')) {
                    imgSrc = 'asset-logo/baju vektor.png';
                } else if (nameLow.includes('setrika')) {
                    imgSrc = 'asset-logo/setrika vektor.png';
                } else if (nameLow.includes('lain')) {
                    imgSrc = 'asset-logo/boneka vektor.png';
                }
                
                return `
                <div class="layanan-card">
                    <div class="layanan-icon-wrapper">
                        <img src="${imgSrc}" alt="icon" style="width: 28px; height: 28px; object-fit: contain;">
                    </div>
                    <div class="layanan-info">
                        <h4>${l.nama_layanan}</h4>
                        <p>Rp ${l.harga_per_kg.toLocaleString()} <span>/${l.nama_layanan.toLowerCase() === 'lain lain' ? 'pcs' : 'kg'}</span></p>
                    </div>
                </div>
                `;
            }).join('');
        } else {
            layananContainer.innerHTML = '<div style="font-size:0.85rem; color:var(--text-muted)">Belum ada layanan</div>';
        }

        // Render Orderan
        const orderanContainer = document.getElementById('orderan-container');
        const activeOrders = orderanRes.data
            .filter(o => o.status === 'Diproses' || o.status === 'Selesai')
            .reverse(); // show all active orders
            
        if (activeOrders.length > 0) {
            orderanContainer.innerHTML = activeOrders.map(o => {
                const isSelesai = o.status === 'Selesai';
                const statusClass = isSelesai ? 'selesai' : 'proses';
                const date = new Date(o.waktu_masuk).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
                const icon = isSelesai ? 'check-circle' : 'loader';
                
                return `
                <div class="order-card ${statusClass}">
                    <div class="order-img">
                        <i data-lucide="${icon}"></i>
                    </div>
                    <div class="order-content">
                        <div class="order-status">${isSelesai ? 'Completed' : 'In Progress'}</div>
                        <div class="order-name">${o.nama_pelanggan}</div>
                        <div class="order-detail">
                            ${o.berat_laundry} ${o.layanan.nama_layanan.toLowerCase() === 'lain lain' ? 'Pcs' : 'Kg'} • ${o.layanan.nama_layanan}
                        </div>
                        <div class="order-date">
                            <i data-lucide="calendar" style="width:12px;height:12px"></i> ${date}
                        </div>
                    </div>
                    <div class="order-price">
                        Rp ${o.total_harga.toLocaleString()} <i data-lucide="chevron-right" style="color:var(--text-muted); width:16px"></i>
                    </div>
                </div>
                `;
            }).join('');
        } else {
            orderanContainer.innerHTML = '<div style="font-size:0.85rem; color:var(--text-muted); text-align:center">Belum ada pesanan aktif</div>';
        }

        // Re-init icons for injected HTML
        lucide.createIcons();
    } catch (err) {
        console.error(err);
    }
}

loadData();
