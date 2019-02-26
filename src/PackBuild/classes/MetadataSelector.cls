public with sharing class MetadataSelector {
    @AuraEnabled(cacheable=true)
    public static String listMetadata(String metadataType, String packageType) {
        MetadataService.MetadataPort service = createService();
        List<fileProperty> files = new List<fileProperty>();
		List<MetadataService.ListMetadataQuery> queries = new List<MetadataService.ListMetadataQuery>();
        MetadataService.ListMetadataQuery query = new MetadataService.ListMetadataQuery();
        query.type_x = metadataType;
        queries.add(query);

        MetadataService.FileProperties[] properties = service.listMetadata(queries, API_VERSION);

        for(MetadataService.FileProperties property: properties) {
            if(packageType == 'All') {
                files.add(new fileProperty(property.fileName, property.fullName, property.id, property.manageableState, property.namespacePrefix));
            } else if(packageType == 'unmanagedOnly') {
                if(property.namespacePrefix == null) {
                    files.add(new fileProperty(property.fileName, property.fullName, property.id, property.manageableState, property.namespacePrefix));
                }
            } else if(packageType == 'managedOnly') {
                if(property.namespacePrefix != null) {
                    files.add(new fileProperty(property.fileName, property.fullName, property.id, property.manageableState, property.namespacePrefix));
                }
            }
        }
		
        return JSON.serialize(files);
	}

    public class fileProperty{
        public String fileName;
        public String fullName;
        public String id;
        public String manageableState;
        public String namespacePrefix;

        public fileProperty(String fileName, String fullName, String id, string manageableState, String namespacePrefix) {
            this.fileName = fileName;
            this.fullName = fullName;
            this.id = id;
            this.manageableState = manageableState;
            this.namespacePrefix = namespacePrefix;
        }
    }

    private static MetadataService.MetadataPort createService() {
		MetadataService.MetadataPort service = new MetadataService.MetadataPort();
		service.SessionHeader = new MetadataService.SessionHeader_element();
		// service.SessionHeader.sessionId = UserInfo.getSessionId();
        service.SessionHeader.sessionId = MetadataUtility.getSessionIdFromVFPage(Page.SessionId);
		return service;
	}

    private static final Integer API_VERSION = Integer.ValueOf(MetadataUtility.API_VERSION);
}
