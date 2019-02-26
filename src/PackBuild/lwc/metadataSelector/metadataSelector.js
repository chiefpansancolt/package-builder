import { LightningElement, track } from 'lwc';
import listMetadata from '@salesforce/apex/MetadataSelector.listMetadata';

const columns = [
    { label: 'Name', fieldName: 'fullName', type: 'string' },
    { label: 'File Name', fieldName: 'fileName', type: 'string' },
    { label: 'Manageable State', fieldName: 'manageableState', type: 'string' },
    { label: 'Namespace', fieldName: 'namespacePrefix', type: 'string' }
];

export default class MetadataSelector extends LightningElement {
    info;
    @track data = [];
    @track columns = columns;
    @track metadataType = '';
    @track packageType = '';
    @track showMetadataList = false;
    @track tableLoadingState = true;
    @track includeAllSymbol = false;
    @track errors;

    handleMetadataSearch() {
        listMetadata({ metadataType: this.metadataType, packageType: this.packageType })
            .then(result => {
                this.data = JSON.parse(result);
                this.error = undefined;
                this.showMetadataList = true;
                this.tableLoadingState = false;
                if(this.metadataType === 'CustomLabels') {
                    this.includeAllSymbol = true;
                } else {
                    this.includeAllSymbol = false;
                }
            })
            .catch(error => {
                this.data = undefined;
                this.error = error;
                this.includeAllSymbol = false;
            });
    }

    handleMetadataTypeChange(event) {
        this.metadataType = event.target.value;
    }

    handlePackageTypeChange(event) {
        this.packageType = event.target.value;
    }

    get packageTypeOptions() {
        return [
            { label: 'All', value: 'all' },
            { label: 'Unmanaged Only', value: 'unmanagedOnly' },
            { label: 'Managed Only', value: 'managedOnly' }
        ];
    }

    get metadataOptions() {
        return [
            { label: 'Account Settings', value: 'AccountSettings' },
            { label: 'Action Link Group Template', value: 'ActionLinkGroupTemplate' },
            { label: 'Action Override', value: 'ActionOverride' },
            { label: 'Activities Settings', value: 'ActivitiesSettings' },
            { label: 'Address Settings', value: 'AddressSettings' },
            { label: 'Analytic Snapshot', value: 'AnalyticSnapshot' },
            { label: 'Apex Class', value: 'ApexClass' },
            { label: 'Apex Component', value: 'ApexComponent' },
            { label: 'Apex Page', value: 'ApexPage' },
            { label: 'Apex Trigger', value: 'ApexTrigger' },
            { label: 'App Menu', value: 'AppMenu' },
            { label: 'Approval Process', value: 'ApprovalProcess' },
            { label: 'Article Type', value: 'ArticleType' },
            { label: 'Assignment Rules', value: 'AssignmentRules' },
            { label: 'Audience', value: 'Audience' },
            { label: 'Auth Provider', value: 'AuthProvider' },
            { label: 'Aura Definition Bundle', value: 'AuraDefinitionBundle' },
            { label: 'Auto Response Rules', value: 'AutoResponseRules' },
            { label: 'Base Sharing Rule', value: 'BaseSharingRule' },
            { label: 'Bot', value: 'Bot' },
            { label: 'Bot Version', value: 'BotVersion' },
            { label: 'Branding Set', value: 'BrandingSet' },
            { label: 'Business Hours Settings', value: 'BusinessHoursSettings' },
            { label: 'Business Process', value: 'BusinessProcess' },
            { label: 'Call Center', value: 'CallCenter' },
            { label: 'Case Settings', value: 'CaseSettings' },
            { label: 'Case Subject Particle', value: 'CaseSubjectParticle' },
            { label: 'Certificate', value: 'Certificate' },
            { label: 'Chatter Answers Settings', value: 'ChatterAnswersSettings' },
            { label: 'Chatter Extension', value: 'ChatterExtension' },
            { label: 'Clean Data Service', value: 'CleanDataService' },
            { label: 'CMS Connect Source', value: 'CMSConnectSource' },
            { label: 'Compact Layout', value: 'CompactLayout' },
            { label: 'Company Settings', value: 'CompanySettings' },
            { label: 'Community', value: 'Community' },
            { label: 'Community Template Definition', value: 'CommunityTemplateDefinition' },
            { label: 'Community Theme Definition', value: 'CommunityThemeDefinition' },
            { label: 'Connected App', value: 'ConnectedApp' },
            { label: 'Content Asset', value: 'ContentAsset' },
            { label: 'Contract Settings', value: 'ContractSettings' },
            { label: 'Cors Whitelist Origin', value: 'CorsWhitelistOrigin' },
            { label: 'Criteria Based Sharing Rule', value: 'CriteriaBasedSharingRule' },
            { label: 'Csp Trusted Site', value: 'CspTrustedSite' },
            { label: 'Custom Application', value: 'CustomApplication' },
            { label: 'Custom Application Component', value: 'CustomApplicationComponent' },
            { label: 'Custom Feed Filter', value: 'CustomFeedFilter' },
            { label: 'Custom Field', value: 'CustomField' },
            { label: 'Custom Help Menu Section', value: 'CustomHelpMenuSection' },
            { label: 'Custom Labels', value: 'CustomLabels' },
            { label: 'Custom Label', value: 'CustomLabel' },
            { label: 'Custom Metadata Types', value: 'CustomMetadataTypes' },
            { label: 'Custom Metadata', value: 'CustomMetadata' },
            { label: 'Custom Object', value: 'CustomObject' },
            { label: 'Custom Object Translation', value: 'CustomObjectTranslation' },
            { label: 'Custom Page Web Link', value: 'CustomPageWebLink' },
            { label: 'Custom Permission', value: 'CustomPermission' },
            { label: 'Custom Site', value: 'CustomSite' },
            { label: 'Custom Tab', value: 'CustomTab' },
            { label: 'Dashboard', value: 'Dashboard' },
            { label: 'Data Category Group', value: 'DataCategoryGroup' },
            { label: 'Delegate Group', value: 'DelegateGroup' },
            { label: 'Document', value: 'Document' },
            { label: 'Duplicate Rule', value: 'DuplicateRule' },
            { label: 'Eclair Geo Data', value: 'EclairGeoData' },
            { label: 'Email Services Function', value: 'EmailServicesFunction' },
            { label: 'Email Template', value: 'EmailTemplate' },
            { label: 'Embedded Service Branding', value: 'EmbeddedServiceBranding' },
            { label: 'Embedded Service Config', value: 'EmbeddedServiceConfig' },
            { label: 'Embedded Service Flow Config', value: 'EmbeddedServiceFlowConfig' },
            { label: 'Embedded Service Live Agent', value: 'EmbeddedServiceLiveAgent' },
            { label: 'Entitlement Process', value: 'EntitlementProcess' },
            { label: 'Entitlement Settings', value: 'EntitlementSettings' },
            { label: 'Entitlement Template', value: 'EntitlementTemplate' },
            { label: 'Event Delivery', value: 'EventDelivery' },
            { label: 'Event Subscription', value: 'EventSubscription' },
            { label: 'External Service Registration', value: 'ExternalServiceRegistration' },
            { label: 'External Data Source', value: 'ExternalDataSource' },
            { label: 'Feature Parameter Boolean', value: 'FeatureParameterBoolean' },
            { label: 'Feature Parameter Date', value: 'FeatureParameterDate' },
            { label: 'Feature Parameter Integer', value: 'FeatureParameterInteger' },
            { label: 'Field Set', value: 'FieldSet' },
            { label: 'File Upload And Download Security Settings', value: 'FileUploadAndDownloadSecuritySettings' },
            { label: 'Flexi Page', value: 'FlexiPage' },
            { label: 'Flow', value: 'Flow' },
            { label: 'Flow Category', value: 'FlowCategory' },
            { label: 'Flow Definition', value: 'FlowDefinition' },
            { label: 'Folder', value: 'Folder' },
            { label: 'Folder Share', value: 'FolderShare' },
            { label: 'Forecasting Settings', value: 'ForecastingSettings' },
            { label: 'Global Value Set', value: 'GlobalValueSet' },
            { label: 'Global Value Set Translation', value: 'GlobalValueSetTranslation' },
            { label: 'Global Picklist Value', value: 'GlobalPicklistValue' },
            { label: 'Group', value: 'Group' },
            { label: 'Home Page Component', value: 'HomePageComponent' },
            { label: 'Home Page Layout', value: 'HomePageLayout' },
            { label: 'Ideas Settings', value: 'IdeasSettings' },
            { label: 'Index', value: 'Index' },
            { label: 'Installed Package', value: 'InstalledPackage' },
            { label: 'IoT Settings', value: 'IoTSettings' },
            { label: 'Keyword List', value: 'KeywordList' },
            { label: 'Knowledge Settings', value: 'KnowledgeSettings' },
            { label: 'Layout', value: 'Layout' },
            { label: 'Letterhead', value: 'Letterhead' },
            { label: 'Lightning Bolt', value: 'LightningBolt' },
            { label: 'Lightning Component Bundle', value: 'LightningComponentBundle' },
            { label: 'Lightning Experience Theme', value: 'LightningExperienceTheme' },
            { label: 'List View', value: 'ListView' },
            { label: 'Live Agent Settings', value: 'LiveAgentSettings' },
            { label: 'Live Chat Agent Config', value: 'LiveChatAgentConfig' },
            { label: 'Live Chat Button', value: 'LiveChatButton' },
            { label: 'Live Chat Deployment', value: 'LiveChatDeployment' },
            { label: 'Live Chat Sensitive Data Rule', value: 'LiveChatSensitiveDataRule' },
            { label: 'Live Message Settings', value: 'LiveMessageSettings' },
            { label: 'Macro Settings', value: 'MacroSettings' },
            { label: 'Managed Topics', value: 'ManagedTopics' },
            { label: 'Matching Rule', value: 'MatchingRule' },
            { label: 'Metadata', value: 'Metadata' },
            { label: 'Metadata With Content', value: 'MetadataWithContent' },
            { label: 'Milestone Type', value: 'MilestoneType' },
            { label: 'MlDomain', value: 'MlDomain' },
            { label: 'Mobile Settings', value: 'MobileSettings' },
            { label: 'Moderation Rule', value: 'ModerationRule' },
            { label: 'Named Credential', value: 'NamedCredential' },
            { label: 'Named Filter', value: 'NamedFilter' },
            { label: 'Name Settings', value: 'NameSettings' },
            { label: 'Network', value: 'Network' },
            { label: 'Network Branding', value: 'NetworkBranding' },
            { label: 'Omni Channel Settings', value: 'OmniChannelSettings' },
            { label: 'Opportunity Settings', value: 'OpportunitySettings' },
            { label: 'Order Settings', value: 'OrderSettings' },
            { label: 'Org Preference Settings', value: 'OrgPreferenceSettings' },
            { label: 'Owner Sharing Rule', value: 'OwnerSharingRule' },
            { label: 'Package', value: 'Package' },
            { label: 'Path Assistant', value: 'PathAssistant' },
            { label: 'Path Assistant Settings', value: 'PathAssistantSettings' },
            { label: 'Permission Set', value: 'PermissionSet' },
            { label: 'Picklist', value: 'Picklist' },
            { label: 'Platform Cache Partition', value: 'PlatformCachePartition' },
            { label: 'Platform Event Channel', value: 'PlatformEventChannel' },
            { label: 'Portal', value: 'Portal' },
            { label: 'Post Template', value: 'PostTemplate' },
            { label: 'Presence Decline Reason', value: 'PresenceDeclineReason' },
            { label: 'Presence User Config', value: 'PresenceUserConfig' },
            { label: 'Product Settings', value: 'ProductSettings' },
            { label: 'Profile', value: 'Profile' },
            { label: 'Profile Action Override', value: 'ProfileActionOverride' },
            { label: 'Profile Password Policy', value: 'ProfilePasswordPolicy' },
            { label: 'Profile Session Setting', value: 'ProfileSessionSetting' },
            { label: 'Queue', value: 'Queue' },
            { label: 'Queue Routing Config', value: 'QueueRoutingConfig' },
            { label: 'Quick Action', value: 'QuickAction' },
            { label: 'Quote Settings', value: 'QuoteSettings' },
            { label: 'Recommendation Strategy', value: 'RecommendationStrategy' },
            { label: 'Record Action Deployment', value: 'RecordActionDeployment' },
            { label: 'Record Type', value: 'RecordType' },
            { label: 'Remote Site Setting', value: 'RemoteSiteSetting' },
            { label: 'Report', value: 'Report' },
            { label: 'Report Type', value: 'ReportType' },
            { label: 'Role', value: 'Role' },
            { label: 'Saml SSO Config', value: 'SamlSsoConfig' },
            { label: 'Scontrol', value: 'Scontrol' },
            { label: 'Search Layouts', value: 'SearchLayouts' },
            { label: 'Search Settings', value: 'SearchSettings' },
            { label: 'Security Settings', value: 'SecuritySettings' },
            { label: 'Service Channel', value: 'ServiceChannel' },
            { label: 'Service Presence Status', value: 'ServicePresenceStatus' },
            { label: 'Sharing Base Rule', value: 'SharingBaseRule' },
            { label: 'Sharing Reason', value: 'SharingReason' },
            { label: 'Sharing Recalculation', value: 'SharingRecalculation' },
            { label: 'Sharing Rules', value: 'SharingRules' },
            { label: 'Sharing Set', value: 'SharingSet' },
            { label: 'Site Dot Com', value: 'SiteDotCom' },
            { label: 'Skill', value: 'Skill' },
            { label: 'Social Customer Service Settings', value: 'SocialCustomerServiceSettings' },
            { label: 'Standard Value Set', value: 'StandardValueSet' },
            { label: 'Standard Value Set Translation', value: 'StandardValueSetTranslation' },
            { label: 'Static Resource', value: 'StaticResource' },
            { label: 'Synonym Dictionary', value: 'SynonymDictionary' },
            { label: 'Territory', value: 'Territory' },
            { label: 'Territory2', value: 'Territory2' },
            { label: 'Territory2 Model', value: 'Territory2Model' },
            { label: 'Territory2 Rule', value: 'Territory2Rule' },
            { label: 'Territory2 Settings', value: 'Territory2Settings' },
            { label: 'Territory2 Type', value: 'Territory2Type' },
            { label: 'Topics For Objects', value: 'TopicsForObjects' },
            { label: 'Transaction Security Policy', value: 'TransactionSecurityPolicy' },
            { label: 'Translations', value: 'Translations' },
            { label: 'Validation Rule', value: 'ValidationRule' },
            { label: 'Wave Application', value: 'WaveApplication' },
            { label: 'Wave Dashboard', value: 'WaveDashboard' },
            { label: 'Wave Dataflow', value: 'WaveDataflow' },
            { label: 'Wave Dataset', value: 'WaveDataset' },
            { label: 'Wave Lens', value: 'WaveLens' },
            { label: 'Wave Template Bundle', value: 'WaveTemplateBundle' },
            { label: 'Wave Xmd', value: 'WaveXmd' },
            { label: 'Web Link', value: 'WebLink' },
            { label: 'Workflow', value: 'Workflow' }
        ];
    }
}