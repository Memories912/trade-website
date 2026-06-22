import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useSourcingStore = defineStore('sourcing', () => {
  const requests = ref([
    {
      id: 'SR-DEMO-001',
      productName: '定制工业激光切割机',
      productDesc: '需要一款1500W光纤激光切割机，能够切割不锈钢和碳钢板材，工作台面不小于1200x2400mm。需要CE认证。',
      quantity: '1台',
      targetPriceMin: '15000',
      targetPriceMax: '25000',
      targetCurrency: 'USD',
      contactName: '王总',
      contactEmail: 'demo@yanzhen.com',
      contactPhone: '+86-137-0000-0003',
      contactCompany: '燕臻进出口有限公司',
      contactCountry: 'China',
      specs: '功率：1500W\n板材厚度：不锈钢≤8mm，碳钢≤16mm\n工作台面：1200x2400mm\n激光头：自动调焦',
      status: 'pending',
      createdAt: '2026-06-19T09:00:00',
      messages: [],
    },
    {
      id: 'SR-DEMO-002',
      productName: '定制不锈钢管件',
      productDesc: '304不锈钢弯头、三通管件，规格DN15-DN100，用于水处理项目。',
      quantity: '2000件',
      targetPriceMin: '3',
      targetPriceMax: '15',
      targetCurrency: 'USD',
      contactName: '刘采购',
      contactEmail: 'demo@yanzhen.com',
      contactPhone: '+86-136-0000-0004',
      contactCompany: '燕臻进出口有限公司',
      contactCountry: 'China',
      specs: '材质：304不锈钢\n规格：DN15-DN100\n类型：90度弯头、等径三通、异径管\n标准：ASTM A403',
      status: 'quoted',
      createdAt: '2026-06-17T16:30:00',
      messages: [
        { id: 'm1', content: '您好，已收到您的定制需求。我们可以提供ASTM A403标准的304不锈钢管件，请确认是否需要第三方检测报告。', timestamp: '2026-06-18T09:00:00', isAdmin: true },
        { id: 'm2', content: '需要第三方检测报告，请提供报价。', timestamp: '2026-06-18T14:00:00', isAdmin: false },
        { id: 'm3', content: '已发送详细报价单，含检测费用。2000件总价约$12,000-18,000，交货期25-35天。', timestamp: '2026-06-19T11:00:00', isAdmin: true },
      ],
    },
    {
      id: 'SR-DEMO-003',
      productName: '定制自动化包装设备',
      productDesc: '需求一条自动化包装流水线，用于电子产品包装。需要包含自动开箱、称重、封箱、贴标功能。',
      quantity: '1条生产线',
      targetPriceMin: '50000',
      targetPriceMax: '120000',
      targetCurrency: 'USD',
      contactName: '陈工',
      contactEmail: 'demo@yanzhen.com',
      contactPhone: '+86-135-0000-0005',
      contactCompany: '燕臻进出口有限公司',
      contactCountry: 'China',
      specs: '产能：≥600箱/小时\n包装尺寸：L200-500×W150-400×H100-350mm\n电源：380V/50Hz\n贴标精度：±1mm',
      status: 'processing',
      createdAt: '2026-06-15T11:00:00',
      photos: [
        { url: 'https://picsum.photos/seed/pack1/400/400' },
        { url: 'https://picsum.photos/seed/pack2/400/400' },
        { url: 'https://picsum.photos/seed/pack3/400/400' },
      ],
      messages: [
        { id: 'm1', content: '收到您的自动化包装线需求，请提供更多现场布局信息。', timestamp: '2026-06-15T14:00:00', isAdmin: true },
        { id: 'm2', content: '车间面积约500平米，已上传现场照片供参考。', timestamp: '2026-06-16T09:30:00', isAdmin: false },
        { id: 'm3', content: '照片收到，技术团队正在评估方案，预计3个工作日内给出初步方案。', timestamp: '2026-06-16T16:00:00', isAdmin: true },
      ],
    },
    {
      id: 'SR-DEMO-004',
      productName: '定制防水连接器',
      productDesc: '需要一批IP67防水等级连接器，用于户外LED照明项目。',
      quantity: '5000件',
      targetPriceMin: '1.5',
      targetPriceMax: '3.5',
      targetCurrency: 'USD',
      contactName: '赵经理',
      contactEmail: 'demo@yanzhen.com',
      contactPhone: '+86-134-0000-0007',
      contactCompany: '燕臻进出口有限公司',
      contactCountry: 'China',
      specs: '防护等级：IP67\n接口类型：M12/M16\n额定电流：4A\n额定电压：250V\n线长：0.5m',
      status: 'closed',
      createdAt: '2026-06-01T10:00:00',
      messages: [
        { id: 'm1', content: '需求已收到，M12/M16防水连接器均支持IP67，有库存。', timestamp: '2026-06-01T14:00:00', isAdmin: true },
        { id: 'm2', content: '请报M12 5000件价格。', timestamp: '2026-06-02T09:00:00', isAdmin: false },
        { id: 'm3', content: 'M12防水连接器 $2.8/件 FOB，交期15-20天，已发正式报价。', timestamp: '2026-06-02T16:00:00', isAdmin: true },
        { id: 'm4', content: '价格接受，请安排生产。', timestamp: '2026-06-03T11:00:00', isAdmin: false },
        { id: 'm5', content: '订单已完成生产并安排出货，感谢合作！', timestamp: '2026-06-18T14:00:00', isAdmin: true },
      ],
    },
  ])

  function submitRequest(data) {
    const req = {
      id: 'SR' + Date.now().toString(36).toUpperCase(),
      ...data,
      status: 'pending',
      messages: [],
      createdAt: new Date().toISOString(),
    }
    requests.value.unshift(req)
    console.log('Sourcing request submitted:', req)
    return req
  }

  function addMessage(id, content) {
    const idx = requests.value.findIndex(r => r.id === id)
    if (idx !== -1) {
      requests.value[idx].messages.push({
        id: 'm_' + Date.now(),
        content,
        timestamp: new Date().toISOString(),
        isAdmin: false,
      })
    }
  }

  function cancelOrder(id) {
    const idx = requests.value.findIndex(r => r.id === id)
    if (idx !== -1 && requests.value[idx].status === 'pending') {
      requests.value[idx].status = 'cancelled'
      requests.value[idx].messages.push({
        id: 'm_' + Date.now(),
        content: '用户已取消该定制需求',
        timestamp: new Date().toISOString(),
        isAdmin: false,
      })
    }
  }

  const pendingCount = computed(() =>
    requests.value.filter(r => r.status === 'pending').length
  )

  return { requests, submitRequest, addMessage, cancelOrder, pendingCount }
})
