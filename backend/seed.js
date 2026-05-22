require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema, model, Types } = require('mongoose');

// ─── Inline Models ────────────────────────────────────────────────────────────
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});
const User = model('user', userSchema);

const datasetSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    owner: { type: Types.ObjectId, ref: 'user', required: true },
    cover: { type: String },
    category: { type: String, required: true },
    downloadUrl: { type: String },
    createdAt: { type: Date, default: Date.now }
});
const Dataset = model('dataset', datasetSchema);

// ─── Seed Data ─────────────────────────────────────────────────────────────────
const getRealDatasets = (ownerId) => [

    // ── Image Classification ──────────────────────────────────────────────────
    {
        name: 'ImageNet (ILSVRC)',
        category: 'Image Classification',
        owner: ownerId,
        cover: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
        downloadUrl: 'https://image-net.org/download.php',
        description: `## ImageNet Large Scale Visual Recognition Challenge (ILSVRC)

ImageNet is one of the most influential datasets in computer vision history. It contains **over 14 million hand-annotated images** spanning **1,000 object categories** — from dogs and cats to furniture and vehicles.

### Key Stats
| Property | Value |
|---|---|
| Total Images | ~14.2 million |
| Categories | 1,000 (ILSVRC) / 21,841 (full) |
| Avg images/class | 500–1000 |
| Image size | Variable (min 256px) |
| Annotations | Class labels + bounding boxes |

### Why It Matters
ImageNet sparked the deep learning revolution. The AlexNet model trained on this dataset in 2012 achieved a top-5 error rate of 15.3%, beating classical methods by a wide margin and triggering massive investment in deep learning research.

### Use Cases
- Training image classification models (ResNet, VGG, EfficientNet)
- Transfer learning backbone pre-training
- Benchmarking new architectures

### Access
Available at [image-net.org](https://image-net.org) after free registration.`,
    },
    {
        name: 'CIFAR-100',
        category: 'Image Classification',
        owner: ownerId,
        cover: 'https://images.unsplash.com/photo-1582560475093-ba66accbc424?w=800&q=80',
        downloadUrl: 'https://www.cs.toronto.edu/~kriz/cifar-100-python.tar.gz',
        description: `## CIFAR-100 Dataset

The CIFAR-100 dataset is a benchmark dataset consisting of **60,000 color images** across **100 fine-grained classes** grouped into **20 superclasses**. Each image is 32×32 pixels and has both a fine label (100 classes) and a coarse label (20 superclasses).

### Key Stats
| Property | Value |
|---|---|
| Total Images | 60,000 |
| Classes | 100 fine / 20 coarse |
| Training Images | 50,000 |
| Test Images | 10,000 |
| Image Size | 32×32 RGB |

### Superclass Examples
- Aquatic mammals (beaver, dolphin, otter, seal, whale)
- Flowers (orchid, poppy, rose, sunflower, tulip)
- Vehicles (bicycle, bus, motorcycle, pickup truck, train)

### Why It Matters
CIFAR-100 is a step up from CIFAR-10 in difficulty and is widely used to test the generalization capability of classification models. State-of-the-art models achieve ~75-80% top-1 accuracy.

### Access
Available via PyTorch \`torchvision.datasets.CIFAR100\` and TensorFlow Datasets.`,
    },

    // ── Object Detection ──────────────────────────────────────────────────────
    {
        name: 'MS COCO 2017',
        category: 'Object Detection',
        owner: ownerId,
        cover: 'https://images.unsplash.com/photo-1547119957-637f8679db1e?w=800&q=80',
        downloadUrl: 'https://cocodataset.org/#download',
        description: `## Microsoft COCO: Common Objects in Context (2017)

MS COCO is the **gold standard benchmark** for object detection, segmentation, and captioning tasks. It contains images of complex everyday scenes with objects in their natural context.

### Key Stats
| Property | Value |
|---|---|
| Total Images | 330,000+ |
| Annotated Images | 200,000+ |
| Object Categories | 80 |
| Instances | 1.5 million object instances |
| Keypoints | 250,000 person keypoints |
| Annotations | Bounding boxes, segmentation masks, keypoints, captions |

### What Makes It Special
- Images are collected from Flickr with complex real-world scenes
- Each image has **multiple objects** of different sizes/orientations
- Rich annotations: instance segmentation, keypoints, panoptic segmentation

### Tasks Supported
- Object Detection (bounding box)
- Instance Segmentation
- Panoptic Segmentation
- Person Keypoint Detection
- Image Captioning (5 captions/image)

### Models Trained On COCO
YOLO, Faster R-CNN, Mask R-CNN, DETR, EfficientDet

### Access
[cocodataset.org](https://cocodataset.org) — freely available for research use.`,
    },
    {
        name: 'Pascal VOC 2012',
        category: 'Object Detection',
        owner: ownerId,
        cover: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80',
        downloadUrl: 'http://host.robots.ox.ac.uk/pascal/VOC/voc2012/VOCtrainval_11-May-2012.tar',
        description: `## PASCAL Visual Object Classes (VOC) 2012

The PASCAL VOC challenge is one of the most celebrated object detection benchmarks. The 2012 edition contains **11,540 images** with **27,450 annotated objects** across **20 object classes**.

### Key Stats
| Property | Value |
|---|---|
| Training + Validation | 11,540 images |
| Test Set | 10,991 images |
| Object Classes | 20 |
| Annotations | Bounding boxes + segmentation masks |
| Difficulty Flags | Marked for occluded/truncated objects |

### The 20 Classes
Person, Bird, Cat, Cow, Dog, Horse, Sheep, Aeroplane, Bicycle, Boat, Bus, Car, Motorbike, Train, Bottle, Chair, Dining Table, Potted Plant, Sofa, TV/Monitor.

### Evaluation Metric
Mean Average Precision (mAP) at IoU threshold of 0.5.

### Historical Significance
VOC 2012 was the de facto standard benchmark before COCO. Models like Faster R-CNN, SSD, and YOLO were all evaluated on this dataset first.

### Access
Available via [host.robots.ox.ac.uk](http://host.robots.ox.ac.uk/pascal/VOC/) — freely downloadable.`,
    },

    // ── Medical Imaging ───────────────────────────────────────────────────────
    {
        name: 'NIH ChestX-ray14',
        category: 'Medical Imaging',
        owner: ownerId,
        cover: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&q=80',
        downloadUrl: 'https://nihcc.app.box.com/v/ChestXray-NIHCC',
        description: `## NIH ChestX-ray14 Dataset

ChestX-ray14 is a large-scale chest X-ray dataset released by the **National Institutes of Health (NIH)**. It contains **112,120 frontal-view X-ray images** from **30,805 unique patients**, each labeled with up to 14 thoracic disease findings.

### Key Stats
| Property | Value |
|---|---|
| Total Images | 112,120 |
| Unique Patients | 30,805 |
| Disease Labels | 14 |
| Image Format | PNG (1024×1024 px) |
| Annotation Type | Multi-label classification |

### The 14 Pathology Labels
Atelectasis, Cardiomegaly, Effusion, Infiltration, Mass, Nodule, Pneumonia, Pneumothorax, Consolidation, Edema, Emphysema, Fibrosis, Pleural Thickening, Hernia.

### Clinical Significance
This dataset enables automated screening for thoracic diseases, assisting radiologists and potentially extending quality care to underserved regions with AI-assisted diagnosis tools.

### Research Impact
Used by DenseNet, CheXNet (Stanford), and many transformer-based medical imaging models that have achieved radiologist-level performance.

### Access
Available on [NIH Clinical Center](https://nihcc.app.box.com/v/ChestXray-NIHCC) — free for research use.`,
    },
    {
        name: 'ISIC Skin Lesion Dataset 2020',
        category: 'Medical Imaging',
        owner: ownerId,
        cover: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
        downloadUrl: 'https://www.kaggle.com/c/siim-isic-melanoma-classification/data',
        description: `## ISIC 2020 Skin Lesion Analysis Challenge

The **International Skin Imaging Collaboration (ISIC) 2020** dataset is the largest publicly available collection of quality-controlled dermoscopic images of skin lesions, used for melanoma detection.

### Key Stats
| Property | Value |
|---|---|
| Total Images | 33,126 |
| Malignant Cases | 584 (1.76%) |
| Benign Cases | 32,542 (98.24%) |
| Image Format | JPEG (variable resolution) |
| Patient Metadata | Age, sex, body site, lesion ID |

### Clinical Task
Binary classification: **Melanoma vs. Benign lesion**

### Why It's Hard
- Extreme class imbalance (1.76% positive)
- High inter-class visual similarity
- Variation in image quality, lighting, and hair artifacts

### Best Results
Top models on the Kaggle leaderboard achieved **AUC ~0.94**, using ensembles of EfficientNet variants with heavy augmentation.

### Applications
- Early melanoma screening tools
- Mobile dermatology assistants
- Teledermatology platforms

### Access
Available on [Kaggle ISIC 2020](https://www.kaggle.com/c/siim-isic-melanoma-classification) and [isic-archive.com](https://www.isic-archive.com).`,
    },

    // ── Autonomous Vehicles ───────────────────────────────────────────────────
    {
        name: 'KITTI Vision Benchmark Suite',
        category: 'Autonomous Vehicles',
        owner: ownerId,
        cover: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80',
        downloadUrl: 'https://www.cvlibs.net/datasets/kitti/eval_object.php?obj_benchmark=3d',
        description: `## KITTI Vision Benchmark Suite

KITTI is one of the most widely-used **autonomous driving datasets**, captured in Karlsruhe, Germany using a car equipped with stereo cameras, a Velodyne HDL-64E LiDAR, GPS, and an IMU.

### Key Stats
| Property | Value |
|---|---|
| Driving Distance | ~39.2 km |
| Camera Images | 15,000 annotated frames |
| LiDAR Frames | 15,000 |
| 3D Object Annotations | 200,000+ |
| Object Classes | Car, Van, Truck, Pedestrian, Cyclist, Misc |

### Sensors
- 2× PointGrey Flea2 color cameras (stereo)
- 1× Velodyne HDL-64E 3D LiDAR
- 1× OXTS RT3003 GPS/IMU

### Benchmark Tracks
- **Stereo Matching** — Disparity estimation
- **3D Object Detection** — Cars, pedestrians, cyclists in 3D space
- **Road/Lane Detection**
- **Scene Flow Estimation**
- **Depth Completion**

### Why It Matters
KITTI established the foundation for sensor-fusion-based autonomous driving research. Almost every major AV perception model reports KITTI results.

### Access
[cvlibs.net/datasets/kitti](http://www.cvlibs.net/datasets/kitti) — free for non-commercial research.`,
    },
    {
        name: 'Waymo Open Dataset',
        category: 'Autonomous Vehicles',
        owner: ownerId,
        cover: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80',
        downloadUrl: 'https://waymo.com/open/download/',
        description: `## Waymo Open Dataset

The **Waymo Open Dataset** is one of the **largest and most diverse** autonomous driving datasets ever released, collected from Waymo's self-driving fleet across multiple US cities.

### Key Stats
| Property | Value |
|---|---|
| Total Scenes | 2,030 segments (20 seconds each) |
| LiDAR Frames | 200,000+ |
| Camera Images | 1,000,000+ |
| 3D Bounding Boxes | 12.6 million |
| 2D Bounding Boxes | 9.9 million |
| Sensor Coverage | 360° LiDAR + 5 cameras |

### Sensors
- 1× Mid-range LiDAR (360°)
- 4× Short-range LiDARs
- 5× Cameras (front + sides)

### Locations & Diversity
Data collected across **San Francisco, Phoenix, and Mountain View** — covering urban streets, highways, suburban roads, day/night, rain, and fog conditions.

### Benchmark Tasks
- 3D Object Detection (vehicles, pedestrians, cyclists, signs)
- 2D Object Detection
- 3D Tracking
- Domain Adaptation

### Access
[waymo.com/open](https://waymo.com/open) — free for non-commercial research after registration.`,
    },

    // ── Satellite Imagery ─────────────────────────────────────────────────────
    {
        name: 'EuroSAT: Land Use & Cover Classification',
        category: 'Satellite Imagery',
        owner: ownerId,
        cover: 'https://images.unsplash.com/photo-1446941611757-91d2c3bd3d45?w=800&q=80',
        downloadUrl: 'https://madm.dfki.de/files/sentinel/EuroSAT.zip',
        description: `## EuroSAT: Land Use and Land Cover Classification

EuroSAT is a benchmark dataset for **land use and land cover (LULC) classification** based on **Sentinel-2 satellite imagery** from the European Space Agency's Copernicus program.

### Key Stats
| Property | Value |
|---|---|
| Total Images | 27,000 |
| Classes | 10 |
| Image Size | 64×64 pixels |
| Spectral Bands | 13 (RGB + 10 multispectral) |
| Coverage | All of Europe |

### The 10 Land Cover Classes
Annual Crop, Forest, Herbaceous Vegetation, Highway, Industrial Building, Pasture, Permanent Crop, Residential Building, River, Sea/Lake.

### Two Versions
- **RGB version** — Standard 3-channel satellite images
- **All-band version** — All 13 Sentinel-2 spectral channels (including near-infrared, SWIR)

### Applications
- Agricultural monitoring and crop health assessment
- Urban expansion tracking
- Deforestation and habitat loss detection
- Climate change impact analysis

### Benchmark Results
ResNet-50 achieves ~98.6% accuracy on the RGB version. Multi-spectral models reach 99%+.

### Access
Available on [GitHub](https://github.com/phelber/EuroSAT) and [TensorFlow Datasets](https://www.tensorflow.org/datasets/catalog/eurosat).`,
    },
    {
        name: 'SpaceNet 7: Multi-Temporal Urban Change',
        category: 'Satellite Imagery',
        owner: ownerId,
        cover: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800&q=80',
        downloadUrl: 'https://spacenet.ai/sn7-challenge/',
        description: `## SpaceNet 7: Multi-Temporal Urban Development

SpaceNet 7 is a large-scale satellite imagery dataset focused on **tracking urban development changes over time** using high-resolution Planet satellite imagery.

### Key Stats
| Property | Value |
|---|---|
| Area of Interest | 100 km² (101 regions) |
| Time Series | 24 months of monthly imagery |
| Resolution | ~4m GSD (Planet SkySat) |
| Annotation Type | Building footprint polygons |
| Total Labels | 11 million+ building instances |

### Unique Features
- **Multi-temporal** — Same locations captured monthly for 2 years
- **Global Coverage** — Locations across 6 continents
- **Change Detection** — Track building construction, demolition, and expansion

### Challenge Tasks
- **Building Footprint Extraction** — Detect individual building outlines
- **Change Detection** — Identify new/demolished buildings between time steps

### Applications
- Disaster response (rapid damage assessment)
- Urban planning and growth modeling
- Humanitarian mapping (refugee camps, informal settlements)
- Infrastructure monitoring

### Access
Available on [spacenet.ai](https://spacenet.ai/sn7-challenge/) and AWS Open Data. ~47 GB download.`,
    },

    // ── Other ─────────────────────────────────────────────────────────────────
    {
        name: 'CelebA: Large-Scale Face Attributes',
        category: 'Other',
        owner: ownerId,
        cover: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
        downloadUrl: 'https://mmlab.ie.cuhk.edu.hk/projects/CelebA.html',
        description: `## CelebA: Large-Scale CelebFaces Attributes Dataset

CelebA is a large-scale face attributes dataset with **over 200,000 celebrity images**, each annotated with **40 binary attribute labels** and 5 landmark locations.

### Key Stats
| Property | Value |
|---|---|
| Total Images | 202,599 |
| Identities | 10,177 celebrities |
| Attribute Labels | 40 binary attributes per image |
| Face Landmarks | 5 per image |
| Splits | Train / Val / Test |

### Sample Attributes
Arched Eyebrows, Attractive, Bald, Bangs, Big Lips, Big Nose, Black Hair, Blond Hair, Blurry, Brown Hair, Bushy Eyebrows, Chubby, Double Chin, Eyeglasses, Goatee, Gray Hair, Heavy Makeup, High Cheekbones, Male, Mouth Slightly Open, Mustache, Narrow Eyes, No Beard, Oval Face, Pale Skin, Pointy Nose, Smiling, Straight Hair, Wavy Hair, Young…

### Use Cases
- **Facial Attribute Recognition** — Predict multiple attributes from a face image
- **Face Generation** — Used heavily for GAN training (DCGAN, StyleGAN)
- **Face Editing** — Conditional image manipulation (add/remove glasses, change hair color)
- **Identity Verification** — Benchmarking face recognition models

### Access
Available at [mmlab.ie.cuhk.edu.hk/projects/CelebA](https://mmlab.ie.cuhk.edu.hk/projects/CelebA.html) — free for academic use.`,
    },
    {
        name: 'ADE20K Scene Understanding',
        category: 'Other',
        owner: ownerId,
        cover: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=800&q=80',
        downloadUrl: 'http://data.csail.mit.edu/places/ADEchallenge/ADEChallengeData2016.zip',
        description: `## ADE20K: Scene Parsing and Semantic Segmentation

ADE20K is a richly annotated dataset for **semantic scene understanding**, containing images with **dense pixel-level segmentation** across 150 semantic categories and 3,688 object classes.

### Key Stats
| Property | Value |
|---|---|
| Training Images | 20,210 |
| Validation Images | 2,000 |
| Test Images | 3,352 |
| Semantic Categories | 150 (evaluation set) |
| Total Object Classes | 3,688 |
| Annotations | Full instance + semantic segmentation |

### Annotation Depth
Every single pixel in every image is annotated with a class label. Objects are segmented down to fine-grained parts (e.g., car → wheel, door, window).

### Scene Types
Indoor scenes (bedroom, kitchen, bathroom, office) and outdoor scenes (street, forest, mountain, beach).

### Why It's Unique
- **Exhaustive annotation** — No unlabeled pixels
- **Part-level segmentation** — Annotates object parts, not just whole objects
- **Open vocabulary** — Covers 3,688 unique object types vs. COCO's 80

### Top Models
PSPNet, DeepLab, SegFormer, Mask2Former all report state-of-the-art results on ADE20K.

### Access
Available at [groups.csail.mit.edu/vision/datasets/ADE20K](https://groups.csail.mit.edu/vision/datasets/ADE20K/) — free for research.`,
    },
];

// ─── Main Seed Function ────────────────────────────────────────────────────────
async function seed() {
    try {
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB\n');

        // Step 1: Delete all existing datasets
        console.log('🗑️  Deleting all existing datasets...');
        const deleteResult = await Dataset.deleteMany({});
        console.log(`   Deleted ${deleteResult.deletedCount} dataset(s).\n`);

        // Step 2: Find or create the seed admin user
        const SEED_EMAIL = 'waggle.ai@datasets.com';
        let seedUser = await User.findOne({ email: SEED_EMAIL });

        if (!seedUser) {
            console.log('👤 Creating Waggle AI seed user...');
            const hashedPw = bcrypt.hashSync('SeedUser@Waggle123', 10);
            seedUser = await User.create({
                name: 'Waggle AI',
                email: SEED_EMAIL,
                password: hashedPw,
            });
            console.log(`   Created seed user: ${seedUser.name} (${seedUser.email})\n`);
        } else {
            console.log(`👤 Found existing seed user: ${seedUser.name}\n`);
        }

        // Step 3: Insert real datasets
        console.log('📦 Inserting real datasets...\n');
        const datasets = getRealDatasets(seedUser._id);

        for (const ds of datasets) {
            const created = await Dataset.create(ds);
            console.log(`   ✅ [${created.category}] ${created.name}`);
        }

        console.log(`\n🎉 Done! Seeded ${datasets.length} datasets across 6 categories.`);

        // Summary
        const byCategory = {};
        datasets.forEach(d => {
            byCategory[d.category] = (byCategory[d.category] || 0) + 1;
        });
        console.log('\n📊 Summary:');
        Object.entries(byCategory).forEach(([cat, count]) => {
            console.log(`   ${cat}: ${count} dataset(s)`);
        });

    } catch (err) {
        console.error('❌ Seed error:', err.message);
    } finally {
        await mongoose.disconnect();
        console.log('\n🔌 Disconnected from MongoDB.');
        process.exit(0);
    }
}

seed();
