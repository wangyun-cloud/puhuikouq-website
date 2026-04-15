export interface DoctorDoc {
  _id: string;
  name: string;
  photo?: {
    asset?: { _ref?: string; _type?: string };
    alt?: string;
  };
  title: string;
  education: string[];
  qualifications: string[];
  specialties: string[];
  yearsOfPractice: number;
  bio: string;
}

export const realDoctorImages: Record<string, string> = {
  付煜: "/images/doctors/付煜.jpg",
  李玲玉: "/images/doctors/李玲玉.jpg",
  秦风显: "/images/doctors/秦风显.jpg",
  田佳琪: "/images/doctors/田佳琪.jpg",
  许重阳: "/images/doctors/许重阳.jpg",
  谢凯旋: "/images/doctors/谢凯旋.jpg",
  闪阳: "/images/doctors/闪阳.jpg",
  赵先林: "/images/doctors/赵先林.jpg",
  张力: "/images/doctors/张力.jpg",
  王星彤: "/images/doctors/王星彤.jpg",
};

export const fallbackDoctors: DoctorDoc[] = [
  {
    _id: "doctor-1",
    name: "张力",
    photo: { asset: { _ref: "", _type: "image" }, alt: "张力医生" },
    title: "院长 / 副主任医师",
    education: ["口腔医学硕士"],
    qualifications: [
      "中华口腔医学会会员",
      "中华口腔医学会口腔种植专业委员会专科会员",
      "亚太区口腔种植协会会员",
      "瑞士ITI种植认证医师",
      "Nobel Biocare种植认证医师",
      "德国ABT种植认证医师",
      "韩国Dentium种植认证医师",
    ],
    specialties: ["种植牙", "全口种植修复", "美学修复"],
    yearsOfPractice: 15,
    bio:
      "从业口腔种植修复领域十余年，主诊及参与完成三万颗以上的口腔种植修复病例。深耕种植牙修复专业领域，多次参与国内外口腔种植学术交流，先后完成全口美学种植咬合重建、骨缺损的种植体植入、GBR/GTR国际大师研修、穿颧穿翼VIIV全口复杂病例种植高级认证。",
  },
  {
    _id: "doctor-2",
    name: "赵先林",
    photo: { asset: { _ref: "", _type: "image" }, alt: "赵先林医生" },
    title: "种植主任 / 副主任医师",
    education: ["口腔医学硕士"],
    qualifications: [
      "多学科联合种植修复总监",
      "曾在北大口腔医院研修疑难种植",
      "瑞士SIC种植系统中国区临床认证医师",
      "韩国8plant种植认证医师",
      "韩国Dentium种植认证医师",
      "美国Biotanium种植认证医师",
      "德国ABT种植认证医师",
      "瑞士ITI种植认证医师",
    ],
    specialties: ["疑难种植", "半口/全口种植", "数字化微创种植"],
    yearsOfPractice: 18,
    bio:
      "毕业于郑州大学口腔医学院，曾于北大口腔医院专项研修疑难种植技术。曾任职于公立三甲口腔医院及上海高端口腔连锁机构，诊疗标准接轨行业前沿。为精进专业技术，先后赴上海九院、空军军医大学口腔医院深造学习，深耕多学科联合种植修复领域，擅长数字化微创多颗及半口、全口种植修复。",
  },
  {
    _id: "doctor-3",
    name: "付煜",
    photo: { asset: { _ref: "", _type: "image" }, alt: "付煜医生" },
    title: "口腔全科医师",
    education: ["佳木斯大学口腔医学本科"],
    qualifications: [
      "IDE 国际牙科认证会员",
      "瑞士ITI种植认证医师",
      "韩国8plant种植认证医师",
      "韩国Dentium种植认证医师",
    ],
    specialties: ["种植牙", "口腔修复", "阻生齿拔除"],
    yearsOfPractice: 12,
    bio:
      "佳木斯大学口腔医学本科毕业，深耕口腔临床多年，专业功底扎实。秉持保留健康牙体组织、微创操作的诊疗理念，始终以患者为中心。擅长嵌体修复、树脂美学修复、阻生齿及复杂牙拔除，同时精通引导骨再生、上颌窦提升等先进种植技术，在口腔修复与种植领域积累了丰富的临床经验。",
  },
  {
    _id: "doctor-4",
    name: "秦风显",
    photo: { asset: { _ref: "", _type: "image" }, alt: "秦风显医生" },
    title: "口腔主治医师",
    education: ["牙周病学硕士"],
    qualifications: [
      "口腔种植医师",
      "口腔修复医师",
      "韩国8plant种植认证医师",
      "韩国Dentium种植认证医师",
      "美国Biotanium种植认证医师",
      "德国abt种植认证医师",
      "瑞士ITI种植认证医师",
    ],
    specialties: ["种植牙", "口腔修复", "复杂种植病例"],
    yearsOfPractice: 15,
    bio:
      "深耕口腔临床数十载，专业功底扎实。先后赴华西口腔医院、河南省口腔医院进修种植修复，系统精进核心技术。主攻修复牙体牙髓，擅长活动义齿、精密附件、种植修复、全瓷修复及各类口腔缺失修复，尤其精通复杂种植病例。近五年完成种植手术超5000颗，持续深修数字化口腔种植、无牙颌种植修复等高级课程。",
  },
  {
    _id: "doctor-5",
    name: "田佳琪",
    photo: { asset: { _ref: "", _type: "image" }, alt: "田佳琪医生" },
    title: "正畸专科医师",
    education: ["西安交通大学口腔医学系"],
    qualifications: [
      "中华口腔医学会口腔正畸专业委员会会员",
      "正雅隐形矫正认证医生",
      "Ormco明星医生",
      "eBrace舌侧矫正认证医生",
    ],
    specialties: ["牙齿矫正", "隐形矫正", "儿童早期干预"],
    yearsOfPractice: 8,
    bio:
      "毕业于西安交通大学口腔医学系。在口腔临床工作中，擅长牙颌畸形的诊断与治疗，精于各类高难度牙齿矫正，对骨性牙颌畸形、各类牙颌面畸形的矫正和多学科联合治疗有着丰富的临床经验。擅长私人定制个性化固定矫正、隐形矫正、半隐形矫正、传统金属矫正、儿童早期干预、成年女性美学导向治疗等各类矫治。",
  },
  {
    _id: "doctor-6",
    name: "闪阳",
    photo: { asset: { _ref: "", _type: "image" }, alt: "闪阳医生" },
    title: "主治医师",
    education: ["河南大学医学院"],
    qualifications: [
      "曾于上海第九人民医院口腔种植科进修",
      "中华口腔医学会CSA会员",
      "韩国Dentium种植体认证医师",
      "韩国DIO种植认证医师",
      "瑞士SIC种植认证医师",
      "瑞士ITI种植认证医师",
    ],
    specialties: ["微创种植", "即刻种植", "数字化种植"],
    yearsOfPractice: 10,
    bio:
      "毕业于河南大学医学院，曾在上海第九人民医院口腔种植科进修。获得中华口腔医学会CSA会员认证。具有丰富的种植修复临床学习及工作经验，针对各类复杂种植病例进行诊治，尤其擅长数字化种植技术、全口半口即刻种植修复，倡导微创治疗，缩短手术时间的同时创伤小、骨损伤小、愈合快。",
  },
  {
    _id: "doctor-7",
    name: "许重阳",
    photo: { asset: { _ref: "", _type: "image" }, alt: "许重阳医生" },
    title: "口腔全科执业医师",
    education: ["蚌埠医科大学口腔医学专业"],
    qualifications: [
      "中华口腔医学会会员",
      "韩国登腾Dentium种植认证医师",
      "瑞士ITI种植认证医师",
      "德国abt种植认证医师",
    ],
    specialties: ["全科治疗", "固定修复", "美学贴面"],
    yearsOfPractice: 7,
    bio:
      "蚌埠医科大学口腔医学专业毕业，中华口腔医学会会员，以专业背景与权威资质护航诊疗质量。7年临床经验全科医师，多次参加种植、美学贴面、吸附性义齿等专业培训，用扎实技术和丰富经验为患者解决口腔问题。擅长全科治疗，固定修复、美学修复、美学贴面，以及活动义齿和吸附性义齿修复。",
  },
  {
    _id: "doctor-8",
    name: "谢凯旋",
    photo: { asset: { _ref: "", _type: "image" }, alt: "谢凯旋医生" },
    title: "口腔全科医师",
    education: ["蚌埠医学院第一附属医院口腔科进修"],
    qualifications: [
      "执业医师",
      "口腔种植医师",
      "通过拔苗课堂STEP BY STEP口腔种植研修班专业考核",
    ],
    specialties: ["牙体牙髓治疗", "冠修复", "复杂阻生齿拔除"],
    yearsOfPractice: 10,
    bio:
      "口腔科专业基础扎实，从事口腔临床工作近10年，拥有丰富的口腔全科和种植修复经验。四手操作、清创缝合、换药等技能娴熟。擅长牙周炎、牙髓炎及根尖周炎等常见牙周问题，熟练掌握口内牙体牙髓治疗及修复、冠修复、可摘及全口义齿修复、树脂修复、拔除复杂阻生智齿等，曾独立完成200余正畸病例。",
  },
  {
    _id: "doctor-9",
    name: "王星彤",
    photo: { asset: { _ref: "", _type: "image" }, alt: "王星彤医生" },
    title: "口腔种植修复医师",
    education: ["西安交通大学口腔医学专业"],
    qualifications: [
      "Dentist Club China（DCC）会员",
      "韩国8plant种植认证医师",
      "韩国Dentium种植认证医师",
      "瑞士ITI种植认证医师",
      "美国Biotanium种植认证医师",
      "德国abt种植认证医师",
    ],
    specialties: ["全口/半口种植", "贴面修复", "即刻种植"],
    yearsOfPractice: 8,
    bio:
      "毕业于西安交通大学口腔医学专业，理论功底扎实。毕业后师从空军军医大学章哲教授，深耕口腔种植领域，在名师指导下系统掌握先进种植修复技术，形成严谨细致的临床风格。身为Dentist Club China（DCC）会员，获奥齿泰种植系统认证。擅长全口/半口种植及贴面修复，用即刻种植技术为缺牙患者快速重建口腔功能。",
  },
  {
    _id: "doctor-10",
    name: "李玲玉",
    photo: { asset: { _ref: "", _type: "image" }, alt: "李玲玉医生" },
    title: "口腔全科医师",
    education: ["口腔医学本科"],
    qualifications: [
      "口腔执业医师",
      "韩国Dentium种植认证医师",
      "瑞士ITI种植认证医师",
    ],
    specialties: ["根管治疗", "全瓷冠修复", "活动义齿修复"],
    yearsOfPractice: 10,
    bio:
      "具备扎实的专业功底与丰富临床经验。擅长根管治疗，解决牙髓疼痛问题，全瓷冠修复兼顾功能与美观；熟练开展活动义齿修复，贴合口腔生理结构，恢复咀嚼功能；树脂充填微创修复蛀牙，保留健康牙体；同时精通简单智齿拔除及口腔二三期修复等诊疗项目。诊疗中注重细节与患者体验，以专业技术为依托，为患者提供全面、优质的口腔健康解决方案。",
  },
];
