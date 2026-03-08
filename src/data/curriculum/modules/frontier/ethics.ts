// AI伦理与治理 - 课程数据

import type { Lesson } from '../../types';

export const ethicsLessons: Record<string, Lesson> = {
  'ethics-risks': {
    id: 'ethics-risks',
    title: 'AI伦理与风险控制',
    subtitle: '负责任地使用AI技术',
    duration: 45,
    difficulty: 'intermediate',
    tags: ['AI伦理', '风险控制', '负责任AI'],
    objectives: [
      '理解AI应用的主要伦理风险',
      '学会识别和评估潜在危害',
      '掌握风险控制的基本方法',
    ],
    sections: [
      {
        type: 'introduction',
        title: '开篇：技术不是中立的',
        content: `AI技术虽然强大，但也可能带来负面影响。偏见、歧视、隐私泄露、深度伪造……

作为AI开发者，我们有责任识别这些风险，并采取措施加以控制。`,
      },
      {
        type: 'concept',
        title: 'AI伦理的核心原则',
        content: `**四大核心原则**：

**1. 公平性（Fairness）**
- 避免基于种族、性别、年龄等的歧视
- 确保不同群体获得公平对待
- 定期检测和纠正偏见

**2. 透明度（Transparency）**
- 向用户明确说明是AI生成的
- 公开模型的局限性
- 提供决策过程的可解释性

**3. 隐私保护（Privacy）**
- 最小化数据收集
- 用户数据不被滥用
- 提供数据删除和退出选项

**4. 可问责性（Accountability）**
- 明确责任归属
- 建立错误追责机制
- 提供人工复审和申诉渠道`,
        keyPoint: 'AI伦理四大原则：公平性、透明度、隐私保护、可问责性。',
      },
      {
        type: 'concept',
        title: '主要伦理风险',
        content: `**风险一：算法偏见**
- 训练数据中的社会偏见被模型学习
- 招聘、贷款、司法等场景的歧视
- 影响弱势群体权益

**风险二：深度伪造**
- 生成虚假图像、音频、视频
- 用于诈骗、诽谤、政治操纵
- 破坏信任和社会稳定

**风险三：隐私侵犯**
- 通过提示词诱导泄露个人信息
- 训练数据中的敏感信息泄露
- 面部识别、情感分析等监控滥用

**风险四：错误信息传播**
- 生成看似合理但错误的内容
- "幻觉"问题影响决策
- 被用于制造虚假新闻

**风险五：人类能力退化**
- 过度依赖AI导致技能丧失
- 创造力、批判思维减弱
- 知识储备依赖外部`,
      },
      {
        type: 'code',
        title: '代码示例：偏见检测',
        content: '检测AI输出中的潜在偏见：',
        code: `from typing import List, Dict

class BiasDetector:
    """偏见检测器"""

    def __init__(self):
        # 敏感词汇列表
        self.sensitive_terms = {
            'gender': ['男人', '女人', '男性', '女性'],
            'age': ['年轻人', '老年人', '中年'],
            'race': ['黑人', '白人', '亚洲人']
        }
        # 负面情绪词
        self.negative_words = [
            '不行', '差', '有问题', '不适合', '不能'
        ]

    def analyze_output(self, text: str, context: Dict) -> Dict:
        """分析AI输出中的偏见"""
        results = {
            'has_bias': False,
            'bias_types': [],
            'evidence': []
        }

        # 1. 检测敏感词+负面情绪的关联
        for category, terms in self.sensitive_terms.items():
            for term in terms:
                if term in text:
                    # 检查该敏感词附近是否有负面词
                    for neg_word in self.negative_words:
                        if neg_word in text:
                            results['has_bias'] = True
                            results['bias_types'].append(category)
                            results['evidence'].append({
                                'category': category,
                                'term': term,
                                'context': text[max(0, text.find(term)-20):text.find(term)+50]
                            })

        # 2. 检测刻板印象关键词
        stereotypes = {
            '男性': ['强大', '理性', '领导'],
            '女性': ['温柔', '感性', '支持']
        }
        for group, traits in stereotypes.items():
            for trait in traits:
                if group in text and trait in text:
                    results['has_bias'] = True
                    results['bias_types'].append('stereotype')
                    results['evidence'].append(f"潜在刻板印象：{group}-{trait}")

        return results

# 使用示例
detector = BiasDetector()
output = "这个岗位更适合男性，因为男性更理性、更有领导力"
bias_report = detector.analyze_output(output, {})

if bias_report['has_bias']:
    print("⚠️ 检测到潜在偏见！")
    print(f"偏见类型: {bias_report['bias_types']}")
    print(f"证据: {bias_report['evidence']}")
else:
    print("✓ 未检测到明显偏见")`,
        language: 'python',
      },
      {
        type: 'concept',
        title: '风险控制措施',
        content: `**技术层面**：

**1. 输入过滤**
- 检测恶意提示词
- 阻止敏感操作请求
- 限制生成内容类型

**2. 输出审查**
- 内容审核API
- 事实性检查
- 敏感信息检测

**3. 模型限制**
- 明确使用边界
- 拒绝越界请求
- 提供降级方案

**产品层面**：

**1. 透明声明**
- 明确告知是AI生成
- 说明模型局限性
- 提供事实核查建议

**2. 人工介入**
- 高风险场景人工审核
- 重大决策人工确认
- 用户申诉渠道

**3. 持续监控**
- 建立反馈机制
- 跟踪问题案例
- 定期评估影响`,
      },
      {
        type: 'example',
        title: '实战：招聘场景的偏见控制',
        content: `**场景**：AI辅助简历筛选

**风险**：
- 模型可能学习历史数据中的性别/种族偏见
- 影响招聘公平性

**控制措施**：

**1. 训练数据脱敏**
- 移除性别、种族等敏感信息
- 只保留技能、经验等能力相关内容

**2. 输出偏见检测**
- 检测候选人群体分布
- 统计不同群体的推荐率
- 发现异常及时告警

**3. 人工复核机制**
- 前N名候选人人工review
- 发现偏见时调整模型
- 保留申诉和复议渠道

**4. 透明度要求**
- 告知候选人使用AI辅助
- 提供筛选标准说明
- 确保候选人可申诉`,
      },
      {
        type: 'note',
        title: '伦理是动态过程',
        content: 'AI伦理不是一次性工作，随着技术发展和应用场景变化，需要持续评估和调整。建议建立伦理委员会，定期审查和更新政策。',
      },
    ],
    summary: 'AI伦理四大原则：公平性、透明度、隐私保护、可问责性。主要风险包括算法偏见、深度伪造、隐私侵犯、错误信息传播、人类能力退化。控制措施包括输入过滤、输出审查、透明声明、人工介入、持续监控。',
    keyPoints: [
      'AI伦理四大原则：公平性、透明度、隐私保护、可问责性',
      '主要风险：算法偏见、深度伪造、隐私侵犯、错误信息、能力退化',
      '风险控制：技术过滤+产品透明+人工介入+持续监控',
      '伦理是动态过程，需要持续评估和调整',
    ],
    exercises: [
      {
        type: 'choice',
        question: 'AI伦理的四大核心原则不包括？',
        options: [
          '公平性',
          '透明度',
          '隐私保护',
          '利润最大化',
        ],
        answer: '利润最大化',
        explanation: 'AI伦理的四大核心原则是公平性、透明度、隐私保护和可问责性。利润最大化是商业目标，不属于伦理原则。',
      },
      {
        type: 'choice',
        question: '深度伪造的主要危害是？',
        options: [
          '提高了图像质量',
          '用于诈骗、诽谤、政治操纵，破坏信任',
          '促进了AI技术发展',
          '增加了娱乐内容',
        ],
        answer: '用于诈骗、诽谤、政治操纵，破坏信任',
        explanation: '深度伪造可以生成虚假的图像、音频、视频，被用于诈骗、诽谤和政治操纵，严重破坏社会信任。',
      },
    ],
  },

  'ethics-governance': {
    id: 'ethics-governance',
    title: 'AI治理与合规',
    subtitle: '建立完善的AI治理体系',
    duration: 50,
    difficulty: 'advanced',
    tags: ['AI治理', '合规', '政策'],
    objectives: [
      '理解AI治理的核心要素',
      '掌握国内外AI合规要求',
      '学会建立企业AI治理体系',
    ],
    sections: [
      {
        type: 'introduction',
        title: '开篇：从自觉到规范',
        content: `AI技术快速发展，监管也在加速完善。从欧盟AI法案到中国生成式AI管理办法，合规已成为AI产品落地的必修课。

本节课讨论如何建立完善的AI治理体系。`,
      },
      {
        type: 'concept',
        title: 'AI治理框架',
        content: `**治理三大支柱**：

**支柱一：原则与政策**
- 制定AI使用原则
- 明确行为边界
- 建立内部规范

**支柱二：流程与控制**
- 开发流程管控
- 风险评估机制
- 审批和问责流程

**支柱三：人员与文化**
- 责任角色分工
- 伦理培训教育
- 持续改进文化

**AI治理委员会**：
- 由技术、法务、业务、伦理专家组成
- 定期审查AI项目
- 重大决策审批
- 对外沟通协调`,
      },
      {
        type: 'concept',
        title: '国内外AI法规',
        content: `**中国法规**：

**《生成式人工智能服务管理暂行办法》**
- 向公众提供服务需备案
- 内容安全要求
- 用户权益保护
- 数据来源合法性

**《个人信息保护法》**
- 明确告知并取得同意
- 最小必要原则
- 提供删除和导出
- 数据出境审批

**《数据安全法》**
- 数据分类分级保护
- 重要数据目录管理
- 数据安全评估

**欧盟《AI法案》（EU AI Act）**：
**禁止类AI**：社会评分、实时生物识别监控
**高风险AI**：严格审查、合规评估、透明度要求
**有限风险AI**：透明度义务
**最小风险AI**：无特殊要求

**美国**：
- NIST AI风险管理框架（AI RMF）
- 各州AI法案（如纽约州的就业AI法案）`,
      },
      {
        type: 'concept',
        title: '企业AI治理体系',
        content: `**组织架构**：

**AI治理委员会**
- 制定治理政策和标准
- 审批高风险项目
- 定期评估和审计

**AI安全团队**
- 检测和防御安全威胁
- 响应安全事件
- 建立安全标准

**合规团队**
- 解读法规要求
- 审核产品合规性
- 处理监管问询

**流程管控**：

**开发阶段**：
- 风险评估（影响分析）
- 偏见检测和数据审计
- 安全审查
- 治理委员会审批

**发布阶段**：
- 合规性验证
- 透明度声明
- 监控告警部署
- 用户协议更新

**运行阶段**：
- 持续监控性能和安全
- 收集用户反馈
- 定期审计评估
- 应急响应机制`,
      },
      {
        type: 'code',
        title: '代码示例：AI项目风险评估',
        content: '实现AI项目的风险评估框架：',
        code: `from enum import Enum
from dataclasses import dataclass
from typing import List, Dict

class RiskLevel(Enum):
    LOW = 1
    MEDIUM = 2
    HIGH = 3
    CRITICAL = 4

class RiskType(Enum):
    PRIVACY = "隐私风险"
    DISCRIMINATION = "歧视风险"
    SAFETY = "安全风险"
    TRANSPARENCY = "透明度风险"
    ACCOUNTABILITY = "问责风险"

@dataclass
class RiskAssessment:
    project_name: str
    assessment_date: str
    overall_risk: RiskLevel
    findings: List[Dict]
    recommendations: List[str]

class AIRiskAssessor:
    """AI项目风险评估器"""

    def __init__(self):
        self.risk_questions = {
            RiskType.PRIVACY: [
                "是否处理个人敏感信息？",
                "数据来源是否合法？",
                "是否有数据泄露风险？"
            ],
            RiskType.DISCRIMINATION: [
                "决策是否影响用户权益？",
                "训练数据是否存在偏见？",
                "是否有公平性测试？"
            ],
            RiskType.SAFETY: [
                "是否存在安全漏洞风险？",
                "是否容易被恶意利用？",
                "是否有应急响应机制？"
            ],
            RiskType.TRANSPARENCY: [
                "用户是否知道是AI生成？",
                "是否说明模型局限性？",
                "决策过程是否可解释？"
            ],
            RiskType.ACCOUNTABILITY: [
                "责任归属是否明确？",
                "是否有申诉渠道？",
                "是否有错误追责机制？"
            ]
        }

    def assess_project(self, project_info: Dict) -> RiskAssessment:
        """评估AI项目风险"""
        findings = []
        risk_levels = []

        for risk_type, questions in self.risk_questions.items():
            type_risk = self._assess_risk_type(
                risk_type, questions, project_info
            )
            risk_levels.append(type_risk)
            findings.append({
                "type": risk_type.value,
                "level": type_risk.name,
                "notes": self._get_risk_notes(risk_type, type_risk)
            })

        # 计算总体风险
        overall_risk = max(risk_levels)

        # 生成建议
        recommendations = self._generate_recommendations(findings)

        return RiskAssessment(
            project_name=project_info["name"],
            assessment_date=self._get_current_date(),
            overall_risk=overall_risk,
            findings=findings,
            recommendations=recommendations
        )

    def _assess_risk_type(self, risk_type: RiskType,
                         questions: List[str],
                         project_info: Dict) -> RiskLevel:
        """评估特定类型风险"""
        # 这里简化处理，实际应该根据具体回答评估
        risk_factors = project_info.get("risk_factors", {})
        factor_key = risk_type.name.lower()

        if factor_key in risk_factors:
            return risk_factors[factor_key]

        # 默认评估
        if risk_type in [RiskType.PRIVACY, RiskType.SAFETY]:
            return RiskLevel.HIGH
        return RiskLevel.MEDIUM

    def _generate_recommendations(self, findings: List[Dict]) -> List[str]:
        """生成改进建议"""
        recommendations = []

        for finding in findings:
            if finding["level"] in ["HIGH", "CRITICAL"]:
                recommendations.append(
                    f"[{finding['type']}] 需要重点关注，建议："
                )
                recommendations.append(
                    f"  - 实施额外的安全措施"
                )
                recommendations.append(
                    f"  - 进行第三方审计"
                )
            elif finding["level"] == "MEDIUM":
                recommendations.append(
                    f"[{finding['type']}] 建议改进"
                )

        return recommendations

# 使用示例
assessor = AIRiskAssessor()

project_info = {
    "name": "AI简历筛选系统",
    "risk_factors": {
        "PRIVACY": RiskLevel.MEDIUM,
        "DISCRIMINATION": RiskLevel.HIGH,  # 高风险
        "SAFETY": RiskLevel.LOW,
        "TRANSPARENCY": RiskLevel.MEDIUM,
        "ACCOUNTABILITY": RiskLevel.MEDIUM
    }
}

assessment = assessor.assess_project(project_info)

print(f"=== AI项目风险评估 ===")
print(f"项目：{assessment.project_name}")
print(f"总体风险等级：{assessment.overall_risk.name}")
print(f"\\n评估发现：")
for finding in assessment.findings:
    print(f"  - {finding['type']}: {finding['level']}")

print(f"\\n改进建议：")
for rec in assessment.recommendations:
    print(f"  {rec}")`,
        language: 'python',
      },
      {
        type: 'example',
        title: '实战：AI产品合规检查清单',
        content: `**上线前合规检查**：

**数据合规**：
- [ ] 数据来源合法合规
- [ ] 个人信息处理有授权
- [ ] 敏感数据已脱敏/加密
- [ ] 数据出境已审批

**内容安全**：
- [ ] 内容审核机制已部署
- [ ] 违规内容能及时拦截
- [ ] 生成内容有标识
- [ ] 有事实性检查

**用户权益**：
- [ ] 隐私政策完整清晰
- [ ] 用户协议符合法规
- [ ] 提供数据删除/导出
- [ ] 有申诉反馈渠道

**技术安全**：
- [ ] 安全漏洞已修复
- [ ] 加密传输（HTTPS）
- [ ] 访问控制完善
- [ ] 审计日志完整

**透明度**：
- [ ] 明确告知使用AI
- [ ] 说明模型能力边界
- [ ] 提供决策解释（如适用）
- [ ] 有降级方案`,
      },
      {
        type: 'concept',
        title: '持续治理与改进',
        content: `**定期评估**：
- 每季度：运行风险评估
- 每半年：全面合规审计
- 每年：外部第三方审计

**事件响应**：
- 发现问题24小时内响应
- 重大事件及时上报监管
- 受影响用户及时通知
- 复盘总结改进措施

**政策更新**：
- 跟踪法规变化
- 及时更新内部政策
- 重新评估现有项目
- 培训相关人员

**对外沟通**：
- 发布透明度报告
- 与监管机构保持沟通
- 参与行业自律组织
- 建立用户信任`,
      },
      {
        type: 'note',
        title: '治理是竞争优势',
        content: '良好的AI治理不是负担，而是竞争优势。它能降低合规风险、提升用户信任、获得监管认可，为企业长期发展奠定基础。',
      },
    ],
    summary: 'AI治理框架包括原则政策、流程控制、人员文化三大支柱。主要法规包括中国的生成式AI管理办法、个人信息保护法，欧盟AI法案等。企业需要建立治理委员会、风险评估机制、持续改进流程。',
    keyPoints: [
      'AI治理三大支柱：原则政策、流程控制、人员文化',
      '主要法规：中国生成式AI管理办法、欧盟AI法案、美国NIST框架',
      '企业治理体系：委员会+安全团队+合规团队',
      '持续治理：定期评估、事件响应、政策更新、对外沟通',
    ],
    exercises: [
      {
        type: 'choice',
        question: '欧盟AI法案禁止的AI类别不包括？',
        options: [
          '社会评分系统',
          '实时生物识别监控',
          '邮件分类',
          '潜意识操纵',
        ],
        answer: '邮件分类',
        explanation: '欧盟AI法案禁止的是社会评分、实时生物识别监控等高风险AI。邮件分类属于有限风险或最小风险AI。',
      },
      {
        type: 'choice',
        question: 'AI风险评估应该何时进行？',
        options: [
          '只在产品发布前',
          '只在出现问题时',
          '贯穿项目全生命周期，定期评估',
          '不需要风险评估',
        ],
        answer: '贯穿项目全生命周期，定期评估',
        explanation: 'AI风险评估应该贯穿项目全生命周期，从开发到发布再到运行，都需要定期评估和监控。',
      },
    ],
  },
};
