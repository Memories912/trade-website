import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useInquiryStore = defineStore('inquiry', () => {
  const inquiries = ref([
    {
      id: 'INQ-DEMO-001',
      productName: '18V无刷冲击钻',
      contactName: '张经理',
      email: 'demo@yanzhen.com',
      phone: '+86-138-0000-0001',
      company: '燕臻进出口有限公司',
      country: 'China',
      requirements: '需要500台，要求CE和KC认证，30天内交货',
      quantity: '500台',
      targetPrice: '$28 - $45/台',
      status: 'quoted',
      createdAt: '2026-06-18T10:30:00',
      messages: [
        { id: 'm1', content: '感谢您的询盘，我们已经为您查询库存，500台冲击钻可以供应，CE和KC认证齐全。', timestamp: '2026-06-19T09:00:00', isAdmin: true },
        { id: 'm2', content: '好的，请发正式报价单和交期表。', timestamp: '2026-06-19T14:30:00', isAdmin: false },
        { id: 'm3', content: '已发送报价单至您的邮箱，含详细规格和交期。预计30-45天交货。', timestamp: '2026-06-20T10:00:00', isAdmin: true },
      ],
    },
    {
      id: 'INQ-DEMO-002',
      productName: '5.5L数码空气炸锅',
      contactName: '李主管',
      email: 'demo@yanzhen.com',
      phone: '+86-139-0000-0002',
      company: '燕臻进出口有限公司',
      country: 'China',
      requirements: '首批200台，OEM定制包装，需要英文说明书和包装',
      quantity: '200台',
      targetPrice: '$18 - $30/台',
      status: 'pending',
      createdAt: '2026-06-20T14:00:00',
      messages: [],
    },
    {
      id: 'INQ-DEMO-003',
      productName: '高压清洗机 2000PSI',
      contactName: '陈采购',
      email: 'demo@yanzhen.com',
      phone: '+86-137-0000-0006',
      company: '燕臻进出口有限公司',
      country: 'China',
      requirements: '订购200台高压清洗机，已完成付款和发货',
      quantity: '200台',
      targetPrice: '$55 - $85/台',
      status: 'closed',
      createdAt: '2026-06-10T09:00:00',
      messages: [
        { id: 'm1', content: '询盘已收到，200台高压清洗机有现货，含ETL认证。', timestamp: '2026-06-10T14:00:00', isAdmin: true },
        { id: 'm2', content: '价格可以，请发正式PI合同。', timestamp: '2026-06-11T10:00:00', isAdmin: false },
        { id: 'm3', content: 'PI已发至您的邮箱，30%定金，交货期25天。', timestamp: '2026-06-11T15:30:00', isAdmin: true },
        { id: 'm4', content: '定金已付，请安排生产。', timestamp: '2026-06-12T09:00:00', isAdmin: false },
        { id: 'm5', content: '订单已完成生产，已安排发货。感谢合作！', timestamp: '2026-06-28T16:00:00', isAdmin: true },
      ],
    },
  ])

  function submitInquiry(data) {
    const inquiry = {
      id: 'INQ' + Date.now().toString(36).toUpperCase(),
      ...data,
      status: 'pending',
      messages: [],
      createdAt: new Date().toISOString(),
    }
    inquiries.value.unshift(inquiry)
    console.log('New inquiry submitted:', inquiry)
    return inquiry
  }

  function addMessage(id, content) {
    const idx = inquiries.value.findIndex(i => i.id === id)
    if (idx !== -1) {
      inquiries.value[idx].messages.push({
        id: 'm_' + Date.now(),
        content,
        timestamp: new Date().toISOString(),
        isAdmin: false,
      })
    }
  }

  function cancelOrder(id) {
    const idx = inquiries.value.findIndex(i => i.id === id)
    if (idx !== -1 && inquiries.value[idx].status === 'pending') {
      inquiries.value[idx].status = 'cancelled'
      inquiries.value[idx].messages.push({
        id: 'm_' + Date.now(),
        content: '用户已取消该询盘',
        timestamp: new Date().toISOString(),
        isAdmin: false,
      })
    }
  }

  const pendingCount = computed(() =>
    inquiries.value.filter(i => i.status === 'pending').length
  )

  return { inquiries, submitInquiry, addMessage, cancelOrder, pendingCount }
})
