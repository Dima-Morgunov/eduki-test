export enum Language {
    DE = "de",
}

interface Categories {
    id: number;
    title: string;
    slug: string;
}

interface MaterialFile {
    createdAt: string;
    type: string;
}

interface MaterialTopCategories {
    id: number;
    title: string;
}

interface MaterialType {
    id: number;
    title: string;
}

interface Author {
    followersNumber: number;
    becameSellerAt: string;
    searchMode: boolean;
    details: {
        profileBackgroundPath: string;
        world: Language;
        totalMaterials: number;
        publicName: string;
        imagePath: string;
        needsSellerInfo: boolean;
        subjects: Array<string>;
        classes: Array<string>;
        privateProfile: boolean;
        userType: number;
        teachableCertified: boolean;
    };
    id: number;
    slug: string;
}

interface SchoolType {
    id: number;
    title: string;
    interdisciplinary: boolean;
}

export interface Product {
    coverPath: string;
    isInYellowList: boolean;
    distributionType: number;
    sources: string;
    bundleListTotal: string;
    description: string;
    customPagesTotal: number;
    language: Language;
    bestInCategories: Array<Categories>;
    isActive: boolean;
    titleUpdatedByHuman: boolean;
    materialFiles: Array<MaterialFile>;
    title: string;
    createdAt: string;
    firstPreviewImage: {
        plain: string;
        watermarked: string;
    };
    world: Language;
    price: number;
    inFavorites: number;
    averageRating: number;
    id: number;
    isCompletedByAuthor: boolean;
    bundle: boolean;
    slug: string;
    totalFeedbacks: number;
    ccStatus: string;
    descriptionUpdatedByHuman: boolean;
    materialTopCategories: Array<MaterialTopCategories>;
    author: Author;
    fileTypes: string;
    tags: Array<string>;
    schoolTypes: Array<SchoolType>;
    authorFeatured: boolean;
    totalPages: number;
    isShadow: boolean;
    materialTypes: Array<MaterialType>;
    hasBibPreview: boolean;
    status: string;
    hasFixedPrice: boolean;
}
