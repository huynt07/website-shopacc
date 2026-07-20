/* =========================================================
   SHOPACCGAME.VN — Dữ liệu sản phẩm (demo, lưu cứng trong file JS)
   Trong thực tế phần này nên được thay bằng API/backend.
   ========================================================= */

/* Tự động tính đường dẫn tới thư mục common/images/, dựa trên chính
   đường dẫn của file products.js này. Nhờ vậy ảnh sẽ hiện đúng dù bạn
   mở file .html trực tiếp trên máy (file://) hay chạy qua server,
   và dù trang gọi products.js đang nằm ở thư mục gốc hay thư mục con
   (vd product/, contact/...). */
const IMAGE_BASE = (function(){
    var scriptEl = document.currentScript;
    if (!scriptEl){
        var scripts = document.getElementsByTagName('script');
        for (var i = scripts.length - 1; i >= 0; i--){
            if (/products\.js(\?.*)?$/.test(scripts[i].src)){ scriptEl = scripts[i]; break; }
        }
    }
    if (scriptEl && scriptEl.src){
        return scriptEl.src.replace(/js\/products\.js(\?.*)?$/, 'images/');
    }
    return 'common/images/'; // fallback, phòng khi không dò được thẻ script
})();

function img(relativePath){
    return IMAGE_BASE + relativePath;
}

/* Đường dẫn tới thư mục ảnh minh hoạ "bộ sưu tập tướng/skin" cho từng game,
   dùng cho ảnh đại diện mục "Nick ... tự chọn" ở trang chủ. Đây là ảnh
   minh hoạ chung (không phải ảnh tướng/skin thật của game) để tránh vi phạm
   bản quyền hình ảnh trong game. Nếu có ảnh chụp thật từ acc của shop,
   thay đường dẫn dưới đây bằng ảnh thật là được. */
const ROSTER_IMAGE_BASE = IMAGE_BASE + 'roster/';
function rosterImg(relativePath){
    return ROSTER_IMAGE_BASE + relativePath;
}

const PRODUCTS = [
    {
        id: 1,
        game: "Liên Quân Mobile",
        title: "Acc Liên Quân - Full 68 Tướng, 120 Skin",
        price: 850000,
        oldPrice: 1200000,
        rank: "Cao Thủ",
        level: 30,
        skins: 120,
        heroes: 68,
        status: "Còn hàng",
        image: img("products/lien-quan-1.jpg"),
        summary: "Tài khoản full tướng, sở hữu nhiều skin SS và Đấu Trường Chân Lý hiếm.",
        description: "Tài khoản Liên Quân Mobile đã chơi lâu năm, sở hữu toàn bộ 68 tướng hiện có cùng 120 trang phục, trong đó có nhiều skin Chiến Binh Ánh Sáng và SS quý hiếm. Rank mùa hiện tại đạt Cao Thủ, ngọc bổ trợ đã lên phần lớn. Tài khoản sạch, không ràng buộc thông tin, đổi mật khẩu + mail ngay sau khi mua.",
        highlights: ["Đủ 68 tướng", "120 trang phục, có nhiều skin SS", "Rank Cao Thủ mùa hiện tại", "Ngọc bổ trợ 60-70%", "Bảo hành mất tài khoản 07 ngày"]
    },
    {
        id: 2,
        game: "Free Fire",
        title: "Acc Free Fire VIP - Kho Skin Súng Huyền Thoại",
        price: 650000,
        oldPrice: 900000,
        rank: "Heroic",
        level: 65,
        skins: 45,
        heroes: 20,
        status: "Còn hàng",
        image: img("products/free-fire-1.jpg"),
        summary: "Kho skin súng huyền thoại, nhiều nhân vật max cấp, rank Heroic.",
        description: "Tài khoản Free Fire cấp 65, sở hữu hơn 45 skin súng trong đó có các skin huyền thoại theo mùa, 20 nhân vật đã mở khoá và max cấp kỹ năng. Rank hiện tại Heroic, có đầy đủ pet quý hiếm. Bàn giao qua liên kết Facebook hoặc chuyển toàn quyền, hỗ trợ đổi thông tin bảo mật.",
        highlights: ["Cấp 65", "45+ skin súng, có hàng huyền thoại", "20 nhân vật max cấp", "Rank Heroic", "Bảo hành mất tài khoản 07 ngày"]
    },
    {
        id: 3,
        game: "Valorant",
        title: "Acc Valorant - Rank Immortal, Full Genesis",
        price: 1450000,
        oldPrice: 1900000,
        rank: "Immortal",
        level: 120,
        skins: 30,
        heroes: 22,
        status: "Còn hàng",
        image: img("products/valorant-1.jpg"),
        summary: "Rank Immortal, sở hữu bộ skin Elderflame và Genesis hiếm.",
        description: "Tài khoản Valorant rank Immortal, mở khoá toàn bộ 22 đặc vụ, sở hữu bộ skin Elderflame và Genesis full nâng cấp cùng nhiều finisher hiếm. Lịch sử tài khoản sạch, chưa từng bị khoá chat hay report nặng. Đổi mail và mật khẩu ngay sau khi thanh toán.",
        highlights: ["Rank Immortal", "22/22 đặc vụ", "Bộ skin Elderflame + Genesis", "Không lịch sử report nặng", "Bảo hành mất tài khoản 07 ngày"]
    },
    {
        id: 4,
        game: "Liên Minh Huyền Thoại",
        title: "Acc LMHT - 180 Tướng, Rank Kim Cương",
        price: 1100000,
        oldPrice: 1500000,
        rank: "Kim Cương",
        level: 210,
        skins: 95,
        heroes: 180,
        status: "Còn hàng",
        image: img("products/lien-minh-1.jpg"),
        summary: "Gần như full tướng, 95 skin, rank Kim Cương mùa trước.",
        description: "Tài khoản Liên Minh Huyền Thoại cấp 210, sở hữu 180 tướng và 95 bộ trang phục đa dạng từ phổ thông tới cao cấp, đạt rank Kim Cương ở mùa giải gần nhất. Phù hợp cho người muốn trải nghiệm đội hình đa dạng ngay lập tức.",
        highlights: ["180/170+ tướng", "95 skin đa dạng", "Rank Kim Cương mùa trước", "Cấp độ 210", "Bảo hành mất tài khoản 07 ngày"]
    },
    {
        id: 5,
        game: "PUBG Mobile",
        title: "Acc PUBG Mobile - Conqueror, Kho Skin Súng & Xe",
        price: 980000,
        oldPrice: 1350000,
        rank: "Conqueror",
        level: 78,
        skins: 60,
        heroes: 0,
        status: "Còn hàng",
        image: img("products/pubg-1.jpg"),
        summary: "Rank Conqueror, kho skin súng, xe và trang phục hiếm.",
        description: "Tài khoản PUBG Mobile cấp 78, từng đạt rank Conqueror nhiều mùa liên tiếp. Kho đồ gồm hơn 60 skin súng và xe, cùng nhiều bộ trang phục giới hạn theo sự kiện. Tài khoản liên kết đầy đủ, hỗ trợ chuyển sang liên kết mới sau khi mua.",
        highlights: ["Rank Conqueror nhiều mùa", "60+ skin súng & xe", "Trang phục sự kiện giới hạn", "Cấp độ 78", "Bảo hành mất tài khoản 07 ngày"]
    },
    {
        id: 6,
        game: "Genshin Impact",
        title: "Acc Genshin Impact - AR 58, 12 Nhân Vật 5 Sao",
        price: 2200000,
        oldPrice: 2800000,
        rank: "AR 58",
        level: 58,
        skins: 12,
        heroes: 12,
        status: "Sắp hết",
        image: img("products/genshin-1.jpg"),
        summary: "AR 58, sở hữu 12 nhân vật 5 sao cùng nhiều vũ khí giới hạn.",
        description: "Tài khoản Genshin Impact Adventure Rank 58, sở hữu 12 nhân vật 5 sao thuộc nhiều nguyên tố khác nhau, đi kèm loạt vũ khí 5 sao giới hạn đã tinh luyện. Tài khoản đã hoàn thành phần lớn cốt truyện chính và các sự kiện theo mùa.",
        highlights: ["Adventure Rank 58", "12 nhân vật 5 sao", "Vũ khí giới hạn đã tinh luyện", "Hoàn thành cốt truyện chính", "Bảo hành mất tài khoản 07 ngày"]
    },
    {
        id: 7,
        game: "Roblox",
        title: "Acc Roblox - Nhiều Game Hot, Robux Sẵn",
        price: 450000,
        oldPrice: 650000,
        rank: "Premium",
        level: 45,
        skins: 25,
        heroes: 0,
        status: "Còn hàng",
        image: img("products/roblox-1.jpg"),
        summary: "Tài khoản Roblox có sẵn Robux, sở hữu vật phẩm hiếm ở nhiều game hot như Blox Fruits, Fisch.",
        description: "Tài khoản Roblox lâu năm, còn sẵn Robux trong ví, tiến độ cao ở các game nổi tiếng như Blox Fruits, Fisch, Pet Simulator. Sở hữu nhiều item, skin giới hạn theo sự kiện. Tài khoản sạch, hỗ trợ đổi email và mật khẩu ngay sau khi mua.",
        highlights: ["Có sẵn Robux", "Tiến độ cao ở Blox Fruits/Fisch", "Nhiều item giới hạn", "Tài khoản Premium", "Bảo hành mất tài khoản 07 ngày"]
    },
    {
        id: 8,
        game: "Free Fire",
        title: "Acc Free Fire 0đ - Level 20, Sẵn Kim Cương Vụn",
        price: 0,
        oldPrice: 99000,
        rank: "Đồng",
        level: 20,
        skins: 6,
        heroes: 2,
        status: "Miễn phí",
        isFreeDeal: true,
        image: img("products/free-fire-2.jpg"),
        summary: "Acc mồi cấp 20, tặng kèm skin cơ bản — miễn phí 100%, số lượng có hạn.",
        description: "Tài khoản Free Fire 0 đồng dành cho ai muốn trải nghiệm trước khi lên đời acc VIP. Cấp 20, có sẵn vài skin cơ bản và một ít kim cương vụn. Số lượng giới hạn mỗi ngày, nhanh tay để nhận acc.",
        highlights: ["Hoàn toàn miễn phí", "Cấp độ 20", "Sẵn vài skin cơ bản", "Số lượng có hạn mỗi ngày", "Nhận acc ngay sau khi bấm Mua ngay"]
    },
    {
        id: 9,
        game: "Liên Quân Mobile",
        title: "Acc Liên Quân 0đ - 10 Tướng Cơ Bản",
        price: 0,
        oldPrice: 79000,
        rank: "Đồng",
        level: 8,
        skins: 4,
        heroes: 10,
        status: "Miễn phí",
        isFreeDeal: true,
        image: img("products/lien-quan-2.jpg"),
        summary: "Acc tân thủ 10 tướng cơ bản — miễn phí 100%, ai nhanh tay người đó có.",
        description: "Tài khoản Liên Quân dành cho người mới, sở hữu 10 tướng cơ bản đủ dùng để làm quen với game. Được tặng miễn phí trong chương trình tri ân khách hàng, không giới hạn số lần lấy nhưng số lượng acc có hạn mỗi đợt.",
        highlights: ["Hoàn toàn miễn phí", "10 tướng cơ bản", "Phù hợp người mới", "Số lượng có hạn", "Nhận acc ngay sau khi bấm Mua ngay"]
    },
    {
        id: 10,
        game: "Roblox",
        title: "Acc Roblox 0đ - Sẵn Vật Phẩm Cơ Bản",
        price: 0,
        oldPrice: 59000,
        rank: "Cơ bản",
        level: 5,
        skins: 3,
        heroes: 0,
        status: "Miễn phí",
        isFreeDeal: true,
        image: img("products/roblox-2.jpg"),
        summary: "Acc Roblox tặng miễn phí, sẵn vài vật phẩm cơ bản để bắt đầu chơi ngay.",
        description: "Tài khoản Roblox tặng miễn phí cho khách ghé thăm SHOPACCGAME.VN, có sẵn một số vật phẩm cơ bản ở các game hot. Phù hợp để trải nghiệm thử trước khi cân nhắc mua acc VIP nhiều tiến độ hơn.",
        highlights: ["Hoàn toàn miễn phí", "Sẵn vài vật phẩm cơ bản", "Phù hợp trải nghiệm thử", "Số lượng có hạn", "Nhận acc ngay sau khi bấm Mua ngay"]
    },
    {
        id: 11,
        game: "Liên Quân Mobile",
        title: "Acc Liên Quân - Cao Thủ, 90 Tướng, Nhiều Skin SS",
        price: 750000,
        oldPrice: 1050000,
        rank: "Cao Thủ",
        level: 26,
        skins: 90,
        heroes: 90,
        status: "Còn hàng",
        image: img("products/lien-quan-5.jpg"),
        summary: "90 tướng, kho skin SS đa dạng, rank Cao Thủ ổn định.",
        description: "Tài khoản Liên Quân sở hữu 90 tướng cùng dàn skin SS phong phú, rank Cao Thủ mùa hiện tại. Ngọc bổ trợ đã lên khá, phù hợp người muốn chơi đa dạng đội hình mà không cần đầu tư quá nhiều.",
        highlights: ["90 tướng", "Nhiều skin SS", "Rank Cao Thủ", "Ngọc bổ trợ ổn định", "Bảo hành mất tài khoản 07 ngày"]
    },
    {
        id: 12,
        game: "Liên Quân Mobile",
        title: "Acc Liên Quân - Tân Vương, Full Trang Phục VIP",
        price: 1350000,
        oldPrice: 1800000,
        rank: "Tân Vương",
        level: 35,
        skins: 140,
        heroes: 100,
        status: "Còn hàng",
        image: img("products/lien-quan-6.jpg"),
        summary: "Rank Tân Vương, full trang phục VIP, top tài khoản cao cấp.",
        description: "Tài khoản Liên Quân rank Tân Vương, sở hữu 100 tướng và hơn 140 trang phục trong đó nhiều bộ giới hạn theo sự kiện. Chỉ số ngọc bổ trợ gần full, phù hợp game thủ muốn thể hiện đẳng cấp ngay khi vào trận.",
        highlights: ["Rank Tân Vương", "140+ trang phục VIP", "100 tướng", "Ngọc bổ trợ gần full", "Bảo hành mất tài khoản 07 ngày"]
    },
    {
        id: 13,
        game: "Liên Quân Mobile",
        title: "Acc Liên Quân - Kim Cương, 50 Tướng, Skin Rare",
        price: 480000,
        oldPrice: 690000,
        rank: "Kim Cương",
        level: 18,
        skins: 50,
        heroes: 50,
        status: "Còn hàng",
        image: img("products/lien-quan-7.jpg"),
        summary: "Kim Cương, 50 tướng, nhiều skin Rare giá hợp lý.",
        description: "Tài khoản Liên Quân rank Kim Cương, 50 tướng cùng loạt skin Rare được săn đón. Phù hợp người mới muốn lên đời từ acc tân thủ nhưng chưa cần đầu tư mức giá cao.",
        highlights: ["Rank Kim Cương", "50 tướng", "Nhiều skin Rare", "Giá hợp lý", "Bảo hành mất tài khoản 07 ngày"]
    },
    {
        id: 14,
        game: "Liên Quân Mobile",
        title: "Acc Liên Quân - Cao Thủ, Ngọc Max, Skin Chiến Binh",
        price: 620000,
        oldPrice: 890000,
        rank: "Cao Thủ",
        level: 24,
        skins: 70,
        heroes: 65,
        status: "Còn hàng",
        image: img("products/lien-quan-8.jpg"),
        summary: "Ngọc bổ trợ max toàn bộ, sở hữu nhiều skin Chiến Binh.",
        description: "Tài khoản Liên Quân rank Cao Thủ, điểm nhấn là bộ ngọc bổ trợ đã lên max toàn bộ hệ, giúp lên đồ nhanh và mạnh ngay đầu trận. Sở hữu 65 tướng cùng nhiều skin dòng Chiến Binh Ánh Sáng.",
        highlights: ["Ngọc bổ trợ max", "65 tướng", "Nhiều skin Chiến Binh", "Rank Cao Thủ", "Bảo hành mất tài khoản 07 ngày"]
    },
    {
        id: 15,
        game: "Liên Quân Mobile",
        title: "Acc Liên Quân - Bạch Kim, Giá Rẻ, Nhiều Tướng",
        price: 250000,
        oldPrice: 390000,
        rank: "Bạch Kim",
        level: 12,
        skins: 30,
        heroes: 40,
        status: "Còn hàng",
        image: img("products/lien-quan-9.jpg"),
        summary: "Giá rẻ, 40 tướng, phù hợp túi tiền học sinh sinh viên.",
        description: "Tài khoản Liên Quân rank Bạch Kim, sở hữu 40 tướng cùng 30 trang phục cơ bản. Mức giá nhẹ nhàng, phù hợp bạn nào mới tìm hiểu game hoặc muốn có acc riêng để luyện rank.",
        highlights: ["Giá rẻ", "40 tướng", "Rank Bạch Kim", "Phù hợp người mới", "Bảo hành mất tài khoản 07 ngày"]
    },
    {
        id: 16,
        game: "Liên Quân Mobile",
        title: "Acc Liên Quân - Vàng, Tân Thủ Nâng Cấp, Sẵn Skin",
        price: 150000,
        oldPrice: 250000,
        rank: "Vàng",
        level: 8,
        skins: 15,
        heroes: 20,
        status: "Còn hàng",
        image: img("products/lien-quan-10.jpg"),
        summary: "Acc tân thủ đã nâng cấp thêm tướng và vài skin cơ bản.",
        description: "Tài khoản Liên Quân rank Vàng, 20 tướng cùng 15 trang phục cơ bản, phù hợp cho ai muốn có sẵn vốn tướng kha khá mà không cần build lại từ đầu.",
        highlights: ["Giá cực rẻ", "20 tướng", "Rank Vàng", "Sẵn vài skin cơ bản", "Bảo hành mất tài khoản 07 ngày"]
    },
    {
        id: 17,
        game: "Liên Quân Mobile",
        title: "Acc Liên Quân - Cao Thủ, Skin Tối Thượng Hiếm",
        price: 990000,
        oldPrice: 1350000,
        rank: "Cao Thủ",
        level: 28,
        skins: 110,
        heroes: 85,
        status: "Còn hàng",
        image: img("products/lien-quan-11.jpg"),
        summary: "Sở hữu skin Tối Thượng hiếm, rank Cao Thủ, kho tướng lớn.",
        description: "Tài khoản Liên Quân rank Cao Thủ, điểm nổi bật là sở hữu skin Tối Thượng cực hiếm khó săn trên thị trường, cùng 85 tướng và hơn 110 trang phục. Phù hợp người sưu tầm skin hiếm.",
        highlights: ["Skin Tối Thượng hiếm", "85 tướng", "110+ trang phục", "Rank Cao Thủ", "Bảo hành mất tài khoản 07 ngày"]
    },
    {
        id: 18,
        game: "Free Fire",
        title: "Acc Free Fire - Grandmaster, Kho Skin Súng AK",
        price: 720000,
        oldPrice: 990000,
        rank: "Grandmaster",
        level: 58,
        skins: 55,
        heroes: 18,
        status: "Còn hàng",
        image: img("products/free-fire-4.jpg"),
        summary: "Rank Grandmaster, kho skin súng AK và nhân vật đa dạng.",
        description: "Tài khoản Free Fire rank Grandmaster, sở hữu hơn 55 skin súng trong đó nổi bật là loạt skin dòng AK hiếm, cùng 18 nhân vật đã max cấp kỹ năng. Bàn giao nhanh, hỗ trợ đổi thông tin bảo mật.",
        highlights: ["Rank Grandmaster", "55+ skin súng", "Nhiều skin AK hiếm", "18 nhân vật max cấp", "Bảo hành mất tài khoản 07 ngày"]
    },
    {
        id: 19,
        game: "Free Fire",
        title: "Acc Free Fire - Level 70, Full Pet Huyền Thoại",
        price: 890000,
        oldPrice: 1200000,
        rank: "Heroic",
        level: 70,
        skins: 60,
        heroes: 22,
        status: "Còn hàng",
        image: img("products/free-fire-5.jpg"),
        summary: "Cấp 70, sở hữu đầy đủ pet huyền thoại và nhiều skin quý.",
        description: "Tài khoản Free Fire cấp 70, sưu tầm gần như đầy đủ các pet huyền thoại theo mùa, cùng 60 skin súng và 22 nhân vật. Rank Heroic ổn định, tài khoản sạch không lịch sử report nặng.",
        highlights: ["Cấp độ 70", "Full pet huyền thoại", "60 skin súng", "Rank Heroic", "Bảo hành mất tài khoản 07 ngày"]
    },
    {
        id: 20,
        game: "Free Fire",
        title: "Acc Free Fire - Cao Thủ, Nhiều Emote Hiếm",
        price: 380000,
        oldPrice: 550000,
        rank: "Cao Thủ",
        level: 42,
        skins: 30,
        heroes: 12,
        status: "Còn hàng",
        image: img("products/free-fire-6.jpg"),
        summary: "Bộ sưu tập emote hiếm, rank Cao Thủ, giá tầm trung.",
        description: "Tài khoản Free Fire cấp 42, điểm nhấn là bộ sưu tập emote hiếm theo sự kiện cùng 30 skin súng cơ bản đến hiếm. Phù hợp ai thích tạo dấu ấn riêng khi combat.",
        highlights: ["Nhiều emote hiếm", "Cấp độ 42", "30 skin súng", "Rank Cao Thủ", "Bảo hành mất tài khoản 07 ngày"]
    },
    {
        id: 21,
        game: "Free Fire",
        title: "Acc Free Fire - Level 45, Full Skin Súng M4A1",
        price: 310000,
        oldPrice: 450000,
        rank: "Kim Cương",
        level: 45,
        skins: 20,
        heroes: 10,
        status: "Còn hàng",
        image: img("products/free-fire-7.jpg"),
        summary: "Full bộ skin súng M4A1, cấp 45, giá hợp lý.",
        description: "Tài khoản Free Fire cấp 45, sở hữu trọn bộ skin súng M4A1 qua các mùa cùng 10 nhân vật cơ bản. Rank Kim Cương, phù hợp người mới tìm acc có sẵn vốn liếng kha khá.",
        highlights: ["Full skin M4A1", "Cấp độ 45", "Rank Kim Cương", "Giá hợp lý", "Bảo hành mất tài khoản 07 ngày"]
    },
    {
        id: 22,
        game: "Free Fire",
        title: "Acc Free Fire - Level 55, Bundle Xịn, Rank Diamond",
        price: 550000,
        oldPrice: 780000,
        rank: "Diamond",
        level: 55,
        skins: 40,
        heroes: 15,
        status: "Còn hàng",
        image: img("products/free-fire-8.jpg"),
        summary: "Sở hữu nhiều bundle thời trang xịn, rank Diamond.",
        description: "Tài khoản Free Fire cấp 55, tủ đồ có nhiều bundle thời trang theo sự kiện, phối đồ đẹp mắt. Rank Diamond ổn định, phù hợp game thủ thích phong cách thời trang trong game.",
        highlights: ["Nhiều bundle xịn", "Cấp độ 55", "Rank Diamond", "40 skin", "Bảo hành mất tài khoản 07 ngày"]
    },
    {
        id: 23,
        game: "Free Fire",
        title: "Acc Free Fire - Giá Rẻ, Sẵn Vài Skin Cơ Bản",
        price: 150000,
        oldPrice: 250000,
        rank: "Bạch Kim",
        level: 25,
        skins: 10,
        heroes: 5,
        status: "Còn hàng",
        image: img("products/free-fire-9.jpg"),
        summary: "Giá rẻ, cấp 25, sẵn vài skin cơ bản để bắt đầu ngay.",
        description: "Tài khoản Free Fire cấp 25, có sẵn vài skin súng và nhân vật cơ bản, mức giá nhẹ nhàng phù hợp người mới muốn sở hữu acc riêng để luyện tập.",
        highlights: ["Giá cực rẻ", "Cấp độ 25", "Sẵn vài skin cơ bản", "Rank Bạch Kim", "Bảo hành mất tài khoản 07 ngày"]
    },
    {
        id: 24,
        game: "PUBG Mobile",
        title: "Acc PUBG Mobile - Ace Dominator, Kho Trang Phục",
        price: 650000,
        oldPrice: 890000,
        rank: "Ace Dominator",
        level: 62,
        skins: 45,
        heroes: 0,
        status: "Còn hàng",
        image: img("products/pubg-3.jpg"),
        summary: "Rank Ace Dominator, kho trang phục và skin xe đa dạng.",
        description: "Tài khoản PUBG Mobile cấp 62, rank Ace Dominator ổn định qua nhiều mùa. Sở hữu 45 skin trang phục và xe đa dạng, phù hợp người chơi thích rank cao mà không cần full đồ Conqueror.",
        highlights: ["Rank Ace Dominator", "45 skin trang phục & xe", "Cấp độ 62", "Ổn định nhiều mùa", "Bảo hành mất tài khoản 07 ngày"]
    },
    {
        id: 25,
        game: "PUBG Mobile",
        title: "Acc PUBG Mobile - Crown, Full Skin Súng M416",
        price: 420000,
        oldPrice: 590000,
        rank: "Crown",
        level: 48,
        skins: 25,
        heroes: 0,
        status: "Còn hàng",
        image: img("products/pubg-4.jpg"),
        summary: "Full bộ skin súng M416, rank Crown, giá hợp lý.",
        description: "Tài khoản PUBG Mobile cấp 48, sở hữu trọn bộ skin súng M416 qua các season cùng rank Crown ổn định. Phù hợp game thủ yêu thích dòng súng M416.",
        highlights: ["Full skin M416", "Rank Crown", "Cấp độ 48", "Giá hợp lý", "Bảo hành mất tài khoản 07 ngày"]
    },
    {
        id: 26,
        game: "PUBG Mobile",
        title: "Acc PUBG Mobile - Level 60, Giá Rẻ, Sẵn UC",
        price: 280000,
        oldPrice: 400000,
        rank: "Diamond",
        level: 60,
        skins: 12,
        heroes: 0,
        status: "Còn hàng",
        image: img("products/pubg-5.jpg"),
        summary: "Giá rẻ, cấp 60, còn sẵn một ít UC trong ví.",
        description: "Tài khoản PUBG Mobile cấp 60, rank Diamond, còn sẵn một ít UC chưa dùng hết trong ví. Mức giá nhẹ nhàng phù hợp người mới muốn có acc riêng để cày rank.",
        highlights: ["Giá rẻ", "Còn sẵn UC", "Cấp độ 60", "Rank Diamond", "Bảo hành mất tài khoản 07 ngày"]
    },
    {
        id: 27,
        game: "Liên Minh Huyền Thoại",
        title: "Acc LMHT - 150 Tướng, Rank Bạch Kim, Skin Huyền Thoại",
        price: 850000,
        oldPrice: 1150000,
        rank: "Bạch Kim",
        level: 175,
        skins: 70,
        heroes: 150,
        status: "Còn hàng",
        image: img("products/lien-minh-3.jpg"),
        summary: "150 tướng, nhiều skin Huyền Thoại, rank Bạch Kim.",
        description: "Tài khoản Liên Minh Huyền Thoại cấp 175, sở hữu 150 tướng cùng 70 bộ trang phục, trong đó có nhiều skin dòng Huyền Thoại được săn đón. Rank Bạch Kim mùa gần nhất.",
        highlights: ["150 tướng", "Nhiều skin Huyền Thoại", "Rank Bạch Kim", "Cấp độ 175", "Bảo hành mất tài khoản 07 ngày"]
    },
    {
        id: 28,
        game: "Liên Minh Huyền Thoại",
        title: "Acc LMHT - 100 Tướng, Rank Vàng, Giá Sinh Viên",
        price: 400000,
        oldPrice: 600000,
        rank: "Vàng",
        level: 110,
        skins: 35,
        heroes: 100,
        status: "Còn hàng",
        image: img("products/lien-minh-4.jpg"),
        summary: "100 tướng, giá mềm phù hợp học sinh sinh viên.",
        description: "Tài khoản Liên Minh Huyền Thoại cấp 110, sở hữu 100 tướng và 35 trang phục cơ bản, rank Vàng. Mức giá phù hợp túi tiền, thích hợp cho ai muốn thử sức nhiều tướng khác nhau.",
        highlights: ["100 tướng", "Giá sinh viên", "Rank Vàng", "Cấp độ 110", "Bảo hành mất tài khoản 07 ngày"]
    },
    {
        id: 29,
        game: "Valorant",
        title: "Acc Valorant - Rank Diamond, Full Đặc Vụ, Skin Reaver",
        price: 750000,
        oldPrice: 1050000,
        rank: "Diamond",
        level: 85,
        skins: 20,
        heroes: 22,
        status: "Còn hàng",
        image: img("products/valorant-3.jpg"),
        summary: "Rank Diamond, mở khoá full đặc vụ, sở hữu bộ skin Reaver.",
        description: "Tài khoản Valorant rank Diamond, mở khoá toàn bộ 22 đặc vụ, sở hữu bộ skin Reaver ấn tượng cùng vài finisher hiếm. Tài khoản sạch, đổi mail và mật khẩu ngay sau khi mua.",
        highlights: ["Rank Diamond", "22/22 đặc vụ", "Bộ skin Reaver", "Tài khoản sạch", "Bảo hành mất tài khoản 07 ngày"]
    }
];

/* Các acc giảm giá 0 đồng — dùng để hiển thị ở mục riêng trên trang chủ */
const FREE_PRODUCTS = PRODUCTS.filter(function(p){ return Number(p.price) === 0; });

function formatVND(number){
    return number.toLocaleString('vi-VN') + '₫';
}

/* =========================================================
   SHOPACCGAME.VN — Túi mù bí ẩn: tất cả dùng chung 1 ảnh + 1 tên
   "Túi Mù 99K", không thể biết trước bên trong có acc gì.
   Mỗi túi vẫn gắn với 1 tựa game (để gợi ý liên quan) và có
   riêng 1 mã acc để phân biệt, ví dụ #100001.
   ========================================================= */
const BLIND_BAG_IMAGE = img("products/blind-bag.svg");

const BLIND_BAG_PRODUCTS = [
    { id: 201, game: "Liên Quân Mobile",      code: "#100001", price: 99000, oldPrice: 198000 },
    { id: 202, game: "Free Fire",             code: "#100002", price: 99000, oldPrice: 198000 },
    { id: 203, game: "Valorant",              code: "#100003", price: 99000, oldPrice: 299000 },
    { id: 204, game: "Liên Minh Huyền Thoại", code: "#100004", price: 99000, oldPrice: 259000 },
    { id: 205, game: "PUBG Mobile",           code: "#100005", price: 99000, oldPrice: 239000 },
    { id: 206, game: "Genshin Impact",        code: "#100006", price: 99000, oldPrice: 499000 },
    { id: 207, game: "Roblox",                code: "#100007", price: 99000, oldPrice: 198000 }
].map(function(b){
    return Object.assign({
        title: "Túi Mù 99K",
        image: BLIND_BAG_IMAGE,
        isBlindBag: true,
        status: "Bí ẩn"
    }, b);
});

function getBlindBagById(id){
    return BLIND_BAG_PRODUCTS.find(p => p.id === Number(id));
}

function getProductById(id){
    id = Number(id);
    return PRODUCTS.find(p => p.id === id) || getBlindBagById(id);
}

/* =========================================================
   SHOPACCGAME.VN — Danh mục trang chủ, chia theo từng game
   Mỗi game có 2 gói: "Nick tự chọn" và "Túi mù"
   ========================================================= */
const HOME_CATEGORIES = [
    {
        icon: "🔥",
        game: "Liên Quân Mobile",
        subtitle: "Túi mù + nick tự chọn",
        offers: [
            {
                title: "Nick Liên Quân tự chọn",
                image: rosterImg("lien-quan-roster.svg"),
                stock: 152,
                link: "product/index.html?game=" + encodeURIComponent("Liên Quân Mobile")
            },
            /* Đã bỏ mục "Nick Liên Quân Reg" theo yêu cầu — khi nào có acc reg
               thì thêm lại 1 object offer tương tự mục "Nick Liên Quân tự chọn"
               ở trên, đổi title/image/stock/link cho phù hợp. */
            {
                title: "Túi Mù 99K",
                image: BLIND_BAG_IMAGE,
                stock: 268,
                oldPrice: 198000,
                price: 99000,
                link: "product/detail.html?id=201"
            }
        ]
    },
    {
        icon: "🔥",
        game: "Free Fire",
        subtitle: "Túi mù + nick tự chọn",
        offers: [
            {
                title: "Nick Free Fire tự chọn",
                image: rosterImg("free-fire-roster.svg"),
                stock: 174,
                link: "product/index.html?game=" + encodeURIComponent("Free Fire")
            },
            {
                title: "Túi Mù 99K",
                image: BLIND_BAG_IMAGE,
                stock: 229,
                oldPrice: 198000,
                price: 99000,
                link: "product/detail.html?id=202"
            }
        ]
    },
    {
        icon: "🔥",
        game: "Valorant",
        subtitle: "Túi mù + nick tự chọn",
        offers: [
            {
                title: "Nick Valorant tự chọn",
                image: rosterImg("valorant-roster.svg"),
                stock: 96,
                link: "product/index.html?game=" + encodeURIComponent("Valorant")
            },
            {
                title: "Túi Mù 99K",
                image: BLIND_BAG_IMAGE,
                stock: 143,
                oldPrice: 299000,
                price: 99000,
                link: "product/detail.html?id=203"
            }
        ]
    },
    {
        icon: "🔥",
        game: "Liên Minh Huyền Thoại",
        subtitle: "Túi mù + nick tự chọn",
        offers: [
            {
                title: "Nick LMHT tự chọn",
                image: rosterImg("lien-minh-roster.svg"),
                stock: 121,
                link: "product/index.html?game=" + encodeURIComponent("Liên Minh Huyền Thoại")
            },
            {
                title: "Túi Mù 99K",
                image: BLIND_BAG_IMAGE,
                stock: 187,
                oldPrice: 259000,
                price: 99000,
                link: "product/detail.html?id=204"
            }
        ]
    },
    {
        icon: "🔥",
        game: "PUBG Mobile",
        subtitle: "Túi mù + nick tự chọn",
        offers: [
            {
                title: "Nick PUBG Mobile tự chọn",
                image: rosterImg("pubg-roster.svg"),
                stock: 88,
                link: "product/index.html?game=" + encodeURIComponent("PUBG Mobile")
            },
            {
                title: "Túi Mù 99K",
                image: BLIND_BAG_IMAGE,
                stock: 156,
                oldPrice: 239000,
                price: 99000,
                link: "product/detail.html?id=205"
            }
        ]
    },
    {
        icon: "🔥",
        game: "Genshin Impact",
        subtitle: "Túi mù + nick tự chọn",
        offers: [
            {
                title: "Nick Genshin Impact tự chọn",
                image: rosterImg("genshin-roster.svg"),
                stock: 41,
                link: "product/index.html?game=" + encodeURIComponent("Genshin Impact")
            },
            {
                title: "Túi Mù 99K",
                image: BLIND_BAG_IMAGE,
                stock: 77,
                oldPrice: 499000,
                price: 99000,
                link: "product/detail.html?id=206"
            }
        ]
    },
    {
        icon: "🔥",
        game: "Roblox",
        subtitle: "Túi mù + nick tự chọn",
        offers: [
            {
                title: "Nick Roblox tự chọn",
                image: rosterImg("roblox-roster.svg"),
                stock: 63,
                link: "product/index.html?game=" + encodeURIComponent("Roblox")
            },
            {
                title: "Túi Mù 99K",
                image: BLIND_BAG_IMAGE,
                stock: 214,
                oldPrice: 198000,
                price: 99000,
                link: "product/detail.html?id=207"
            }
        ]
    }
];

/* Render các mục "game nào theo game đó" trên trang chủ.
   `basePath` là đường dẫn tương đối tới thư mục product/ (mặc định rỗng vì gọi từ trang chủ). */
function renderHomeCategories(containerEl, basePath){
    const $container = $(containerEl);
    if (!$container.length) return;
    basePath = basePath || '';

    const html = HOME_CATEGORIES.map(function(cat){
        const offersHtml = cat.offers.map(function(o){
            const hasPrice = typeof o.price === 'number';
            return `
            <div class="col-md-6 mb-4">
                <a class="offer-card" href="${basePath}${o.link}">
                    <div class="offer-img-wrap">
                        <img src="${o.image}" alt="${o.title}" loading="lazy">
                        ${hasPrice ? '<span class="offer-ribbon">MUA NGAY</span>' : ''}
                    </div>
                    <div class="offer-body">
                        <h5 class="offer-title">${o.title}</h5>
                        <p class="offer-stock">Tài khoản hiện có: <b>${o.stock}</b></p>
                        ${hasPrice ? `
                        <div class="offer-price-row">
                            <div>
                                <span class="offer-old-price">${formatVND(o.oldPrice)}</span>
                                <span class="offer-new-price">${formatVND(o.price)}</span>
                            </div>
                            <span class="btn-buy-now">MUA NGAY</span>
                        </div>` : ''}
                    </div>
                </a>
            </div>`;
        }).join('');

        return `
        <div class="game-section">
            <div class="game-section-head">
                <h3><span class="game-flame">${cat.icon}</span>${cat.game}</h3>
                <p>${cat.subtitle}</p>
            </div>
            <div class="row">${offersHtml}</div>
        </div>`;
    }).join('');

    $container.html(html);
}

/* Render a grid of product cards into a container element.
   `list` defaults to all PRODUCTS. `detailPath` is the relative
   path (from the calling page) to the detail page. */
function renderProductCards(containerEl, list, detailPath){
    const $container = $(containerEl);
    if (!$container.length) return;
    list = list || PRODUCTS;
    detailPath = detailPath || 'detail.html';

    const html = list.map(function(p){
        return `
        <div class="col-md-6 col-lg-4 mb-4 product-item"
             data-game="${p.game}">
            <div class="card product-card">
                <div class="img-wrap hud-frame">
                    <span class="badge-game">${p.game}</span>
                    <span class="badge-status">${p.status}</span>
                    <img src="${p.image}" alt="${p.title}" loading="lazy">
                </div>
                <div class="card-body">
                    <h5 class="card-title">${p.title}</h5>
                    <p class="card-text">${p.summary}</p>
                    <div class="meta-row">
                        <span><i class="fa-solid fa-ranking-star me-1"></i>${p.rank}</span>
                        <span><i class="fa-solid fa-layer-group me-1"></i>${p.skins} skin</span>
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="price-tag">${formatVND(p.price)}</span>
                        <a href="${detailPath}?id=${p.id}" class="btn btn-outline-primary btn-sm">Xem chi tiết</a>
                    </div>
                </div>
            </div>
        </div>`;
    }).join('');

    $container.html(html);
}

/* Render mục "Acc giảm giá 0 đồng" — thẻ có ribbon nổi bật + nút Nhận ngay,
   dẫn thẳng tới trang chi tiết để bấm Mua ngay. `detailPath` là đường dẫn
   tương đối tới product/detail.html tính từ trang gọi hàm này. */
function renderFreeProductCards(containerEl, list, detailPath){
    const $container = $(containerEl);
    if (!$container.length) return;
    list = list || FREE_PRODUCTS;
    detailPath = detailPath || 'detail.html';

    if (!list.length){
        $container.html('<div class="col-12 text-center" style="color:var(--text-mute)">Hiện chưa có acc 0 đồng nào, quay lại sau nhé!</div>');
        return;
    }

    const html = list.map(function(p){
        return `
        <div class="col-md-6 col-lg-4 mb-4 product-item" data-game="${p.game}">
            <div class="card product-card free-product-card">
                <span class="free-ribbon"><i class="fa-solid fa-gift me-1"></i>0Đ</span>
                <div class="img-wrap hud-frame">
                    <span class="badge-game">${p.game}</span>
                    <img src="${p.image}" alt="${p.title}" loading="lazy">
                </div>
                <div class="card-body">
                    <h5 class="card-title">${p.title}</h5>
                    <p class="card-text">${p.summary}</p>
                    <div class="meta-row">
                        <span><i class="fa-solid fa-ranking-star me-1"></i>${p.rank}</span>
                        <span><i class="fa-solid fa-layer-group me-1"></i>${p.skins} skin</span>
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <span>
                            <span class="price-old">${formatVND(p.oldPrice)}</span>
                            <span class="free-price">Miễn phí</span>
                        </span>
                        <a href="${detailPath}?id=${p.id}" class="btn btn-amber btn-sm">Nhận ngay</a>
                    </div>
                </div>
            </div>
        </div>`;
    }).join('');

    $container.html(html);
}
