// 安全与合规 - 课程数据

import type { Lesson } from '../../types';

export const securityLessons: Record<string, Lesson> = {
  'security-compliance': {
    id: 'security-compliance',
    title: '安全与合规',
    subtitle: '构建安全可信的AI应用',
    duration: 45,
    difficulty: 'intermediate',
    tags: ['安全', '合规', '隐私'],
    objectives: [
      '理解AI应用的主要安全风险',
      '掌握数据隐私保护措施',
      '了解合规要求和认证标准',
    ],
    sections: [
      {
        type: 'introduction',
        title: '开篇：AI应用的特殊安全挑战',
        content: `AI应用不仅有传统软件的安全问题，还有独特挑战：
- 用户可能输入敏感信息
- 模型可能泄露训练数据
- 输出可能包含有害内容

本节课讨论如何构建安全可信的AI应用。`,
      },
      {
        type: 'concept',
        title: 'AI应用的安全风险',
        content: `**风险一：数据泄露**
- 用户输入敏感信息（密码、身份证）
- 模型输出包含其他用户的数据
- 日志中存储敏感内容

**风险二：Prompt注入**
- 用户输入覆盖系统指令
- 诱导模型执行危险操作
- 绕过安全过滤

**风险三：有害输出**
- 生成暴力、歧视内容
- 提供非法建议
- 泄露商业机密

**风险四：模型窃取**
- 通过API查询重建模型
- 知识产权被盗
- 竞争对手复制

**风险五：滥用风险**
- 批量生成垃圾内容
- 自动化攻击脚本
- 社交工程攻击`,
        keyPoint: 'AI应用面临数据泄露、Prompt注入、有害输出、模型窃取、滥用等安全风险。',
      },
      {
        type: 'concept',
        title: '数据隐私保护',
        content: `**原则**：最小化收集，最大化保护

**保护措施**：

**1. 输入过滤**
- PII检测：识别并脱敏敏感信息
- 关键词过滤：阻止危险输入
- 格式检查：验证输入合法性

**2. 输出审计**
- 敏感词检测
- 事实性验证
- 格式校验

**3. 数据存储**
- 加密存储（AES-256）
- 访问控制（RBAC）
- 审计日志

**4. 数据处理**
- 不存储原始输入（可选用）
- 定期删除历史数据
- 匿名化处理

**示例：PII检测与脱敏**
\`\`\`
输入："我的手机号是13812345678"
检测：识别11位手机号
脱敏："我的手机号是138****5678"
\`\`\``,
      },
      {
        type: 'code',
        title: '代码示例：敏感信息检测',
        content: '实现PII检测和脱敏：',
        code: `import re
from typing import List, Tuple

class PIIDetector:
    """敏感信息检测与脱敏"""

    def __init__(self):
        self.patterns = {
            "phone": (r'1[3-9]\\d{9}', self._mask_phone),
            "id_card": (r'\\d{17}[\\dXx]', self._mask_id_card),
            "email": (r'[\\w.-]+@[\\w.-]+\\.\\w+', self._mask_email),
            "credit_card": (r'\\d{13,19}', self._mask_credit_card),
        }

    def detect_and_mask(self, text: str) -> Tuple[str, List[dict]]:
        """检测并脱敏敏感信息"""
        masked_text = text
        detected = []

        for pii_type, (pattern, mask_func) in self.patterns.items():
            matches = re.findall(pattern, text)
            for match in matches:
                # 记录检测结果
                detected.append({
                    "type": pii_type,
                    "value": match,
                    "position": text.find(match)
                })
                # 脱敏处理
                masked_value = mask_func(match)
                masked_text = masked_text.replace(match, masked_value, 1)

        return masked_text, detected

    def _mask_phone(self, phone: str) -> str:
        """手机号脱敏：138****5678"""
        return phone[:3] + "****" + phone[-4:]

    def _mask_id_card(self, id_card: str) -> str:
        """身份证脱敏：110***********1234"""
        return id_card[:3] + "***********" + id_card[-4:]

    def _mask_email(self, email: str) -> str:
        """邮箱脱敏：a***@example.com"""
        parts = email.split("@")
        return parts[0][0] + "***@" + parts[1]

    def _mask_credit_card(self, card: str) -> str:
        """银行卡脱敏：**** **** **** 1234"""
        return "**** **** **** " + card[-4:]

# 使用示例
detector = PIIDetector()
text = "我的手机是13812345678，邮箱是zhang@example.com"
masked, detected = detector.detect_and_mask(text)
print(masked)
# 输出：我的手机是138****5678，邮箱是z***@example.com`,
        language: 'python',
      },
      {
        type: 'concept',
        title: '合规要求',
        content: `**主要法规**：

**1. 《个人信息保护法》（中国）**
- 明确告知用户信息用途
- 获得用户同意
- 提供删除和导出功能
- 数据出境审批

**2. GDPR（欧盟）**
- 用户有权访问、更正、删除数据
- 数据最小化原则
- 隐私保护设计（Privacy by Design）
- 72小时内报告数据泄露

**3. 《数据安全法》（中国）**
- 数据分类分级
- 重要数据保护
- 数据安全评估

**AI特定合规**：
- 《生成式人工智能服务管理暂行办法》（中国）
- 内容审核要求
- 算法备案
- 安全评估报告

**认证标准**：
- ISO 27001：信息安全管理体系
- SOC 2：服务组织控制
- 等保2.0：网络安全等级保护`,
      },
      {
        type: 'example',
        title: '实战：企业合规检查清单',
        content: `**数据收集阶段**：
- [ ] 隐私政策已更新，明确说明数据用途
- [ ] 用户同意机制已实现（勾选框、弹窗）
- [ ] 数据收集最小化，不收集无关信息

**数据处理阶段**：
- [ ] 敏感信息自动检测和脱敏
- [ ] 数据加密存储
- [ ] 访问控制已配置

**数据存储阶段**：
- [ ] 存储加密（传输和静止）
- [ ] 备份机制完善
- [ ] 保留期限设置

**用户权利**：
- [ ] 用户可查看自己的数据
- [ ] 用户可请求删除数据
- [ ] 用户可导出数据

**安全审计**：
- [ ] 操作日志完整记录
- [ ] 定期安全评估
- [ ] 漏洞扫描和修复`,
      },
      {
        type: 'note',
        title: '合规是动态过程',
        content: '法规在不断更新，合规不是一次性工作，需要持续关注新规定、定期评估、及时调整。建议组建专门的合规团队或咨询专业律师。',
      },
    ],
    summary: 'AI应用面临数据泄露、Prompt注入等特殊安全风险。数据隐私保护需要输入过滤、输出审计、加密存储。合规要求包括个人信息保护法、GDPR等法规，需要建立完整的合规体系。',
    keyPoints: [
      'AI安全风险：数据泄露、Prompt注入、有害输出、模型窃取',
      '数据保护：输入过滤、输出审计、加密存储、访问控制',
      '主要法规：个人信息保护法、GDPR、生成式AI管理办法',
      '合规是动态过程，需要持续关注和调整',
    ],
    exercises: [
      {
        type: 'choice',
        question: 'PII指的是？',
        options: [
          'Public Internet Information',
          'Personally Identifiable Information（个人身份信息）',
          'Private International Internet',
          'Protected Information Index',
        ],
        answer: 'Personally Identifiable Information（个人身份信息）',
        explanation: 'PII（个人身份信息）是能够单独或结合其他信息识别特定个人的数据，如姓名、身份证号、手机号等。',
      },
      {
        type: 'choice',
        question: 'GDPR要求多久内报告数据泄露？',
        options: [
          '24小时',
          '72小时',
          '7天',
          '30天',
        ],
        answer: '72小时',
        explanation: 'GDPR规定，发现个人数据泄露后，必须在72小时内向监管机构报告。',
      },
    ],
  },

  'security-best-practices': {
    id: 'security-best-practices',
    title: '安全最佳实践',
    subtitle: '构建企业级安全防护体系',
    duration: 40,
    difficulty: 'advanced',
    tags: ['安全', '最佳实践', '企业级'],
    objectives: [
      '掌握AI应用的安全架构设计',
      '学会安全开发生命周期管理',
      '了解应急响应和恢复机制',
    ],
    sections: [
      {
        type: 'introduction',
        title: '开篇：安全不是附加功能',
        content: `安全应该从第一天就融入产品，而不是上线前才考虑。

本节课我们将学习企业级安全最佳实践，构建完整的安全防护体系。`,
      },
      {
        type: 'concept',
        title: '安全架构设计',
        content: `**纵深防御原则**：
多层防护，单点失败不影响整体安全。

**架构层次**：

**1. 网络层**
- 防火墙：限制入站/出站流量
- DDoS防护：流量清洗
- WAF：Web应用防火墙

**2. 应用层**
- 认证授权：OAuth 2.0、JWT
- 输入验证：白名单、格式检查
- 输出编码：防止XSS

**3. API层**
- 速率限制：防止滥用
- API Key管理：定期轮换
- 请求签名：防篡改

**4. 数据层**
- 加密：传输（TLS）、存储（AES）
- 访问控制：最小权限
- 审计日志：可追溯

**5. 模型层**
- 输入过滤：PII检测、Prompt注入检测
- 输出审计：内容审核、事实检查
- 调用限制：防止模型滥用`,
        keyPoint: '采用纵深防御原则，在多个层次实施安全措施，避免单点失败。',
      },
      {
        type: 'concept',
        title: '安全开发生命周期（SDL）',
        content: `**阶段一：需求分析**
- 安全需求文档
- 威胁建模（STRIDE）
- 隐私影响评估

**阶段二：设计**
- 安全架构设计
- 数据流图
- 安全设计评审

**阶段三：开发**
- 安全编码规范
- 代码审查
- 安全测试

**阶段四：测试**
- 渗透测试
- 安全扫描
- 修复验证

**阶段五：部署**
- 安全配置检查
- 环境隔离
- 变更审批

**阶段六：运维**
- 监控告警
- 漏洞管理
- 应急响应

**持续改进**：
- 定期安全评估
- 事件复盘
- 培训教育`,
      },
      {
        type: 'code',
        title: '代码示例：API安全中间件',
        content: '实现多层API安全防护：',
        code: `from functools import wraps
from flask import request, jsonify
import time
import hmac
import hashlib

# 1. 速率限制
class RateLimiter:
    def __init__(self, max_requests=100, window=60):
        self.max_requests = max_requests
        self.window = window
        self.requests = {}

    def is_allowed(self, client_id: str) -> bool:
        now = time.time()
        if client_id not in self.requests:
            self.requests[client_id] = []

        # 清理过期记录
        self.requests[client_id] = [
            t for t in self.requests[client_id]
            if now - t < self.window
        ]

        if len(self.requests[client_id]) >= self.max_requests:
            return False

        self.requests[client_id].append(now)
        return True

# 2. 请求签名验证
def verify_signature(api_key: str, secret: str, timestamp: str, signature: str) -> bool:
    """验证请求签名"""
    expected = hmac.new(
        secret.encode(),
        f"{api_key}{timestamp}".encode(),
        hashlib.sha256
    ).hexdigest()
    return hmac.compare_digest(expected, signature)

# 3. 安全中间件组合
def security_middleware(rate_limiter):
    def decorator(f):
        @wraps(f)
        def wrapped(*args, **kwargs):
            # 速率限制
            client_id = request.headers.get('X-API-Key', 'anonymous')
            if not rate_limiter.is_allowed(client_id):
                return jsonify({"error": "Rate limit exceeded"}), 429

            # 签名验证（可选）
            if 'X-Signature' in request.headers:
                timestamp = request.headers.get('X-Timestamp', '')
                signature = request.headers.get('X-Signature', '')
                # 验证签名...

            # 输入验证
            content_type = request.content_type or ''
            if 'application/json' not in content_type:
                return jsonify({"error": "Invalid content type"}), 400

            return f(*args, **kwargs)
        return wrapped
    return decorator

# 使用
limiter = RateLimiter(max_requests=100, window=60)

@app.route('/api/chat', methods=['POST'])
@security_middleware(limiter)
def chat():
    return {"response": "Hello"}  `,
        language: 'python',
      },
      {
        type: 'concept',
        title: '应急响应机制',
        content: `**应急响应流程**：

**1. 检测**
- 监控告警
- 用户报告
- 安全审计

**2. 分析**
- 确认事件级别（P0/P1/P2）
- 影响范围评估
- 根因分析

**3. 遏制**
- 隔离受影响系统
- 撤销可疑凭证
- 阻止攻击源

**4. 根除**
- 修复漏洞
- 更新安全规则
- 增强监控

**5. 恢复**
- 恢复服务
- 验证功能
- 通知用户

**6. 复盘**
- 事件报告
- 经验总结
- 改进措施

**事件级别定义**：
- P0：核心服务中断，数据泄露
- P1：功能受影响，潜在风险
- P2：轻微问题，可延后处理`,
      },
      {
        type: 'example',
        title: '实战：安全事件处理',
        content: `**场景**：发现API被大量异常调用

**检测**：监控告警显示API调用量异常增长

**分析**：
- 查看日志：发现同一IP高频调用
- 分析请求：尝试注入攻击
- 确认级别：P1事件

**遏制**：
- 封禁异常IP段
- 临时增加限流规则
- 通知安全团队

**根除**：
- 分析攻击模式
- 更新WAF规则
- 增加输入验证

**恢复**：
- 解除正常用户限制
- 监控异常指标
- 发布安全公告

**复盘**：
- 文档记录事件经过
- 改进监控规则
- 加强员工安全意识培训`,
      },
      {
        type: 'note',
        title: '安全文化建设',
        content: '技术手段只是基础，更重要的是安全文化：全员安全意识培训、安全责任到人、鼓励报告安全问题、定期演练应急响应。',
      },
    ],
    summary: '企业级安全采用纵深防御原则，多层防护。安全开发生命周期从需求到运维全流程融入安全。应急响应机制包括检测、分析、遏制、根除、恢复、复盘六个阶段。',
    keyPoints: [
      '纵深防御：网络、应用、API、数据、模型多层防护',
      'SDL六个阶段：需求、设计、开发、测试、部署、运维',
      '应急响应六步骤：检测、分析、遏制、根除、恢复、复盘',
      '安全文化：全员培训、责任到人、定期演练',
    ],
    exercises: [
      {
        type: 'choice',
        question: '纵深防御的核心思想是？',
        options: [
          '单一强力防护',
          '多层防护，避免单点失败',
          '只关注网络层防护',
          '依赖用户安全意识',
        ],
        answer: '多层防护，避免单点失败',
        explanation: '纵深防御在多个层次实施安全措施，即使一层被突破，其他层仍能保护系统。',
      },
      {
        type: 'choice',
        question: '应急响应的第一步是？',
        options: [
          '立即修复漏洞',
          '检测和确认安全事件',
          '通知所有用户',
          '关闭所有服务',
        ],
        answer: '检测和确认安全事件',
        explanation: '应急响应第一步是检测和确认事件，了解问题性质和范围，才能采取正确措施。',
      },
    ],
  },
};
