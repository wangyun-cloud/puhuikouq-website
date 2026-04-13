import { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('内容管理')
    .items([
      S.listItem()
        .title('预约管理')
        .child(
          S.list()
            .title('预约管理')
            .items([
              S.listItem()
                .title('全部预约')
                .child(
                  S.documentTypeList('booking')
                    .title('全部预约')
                    .defaultOrdering([
                      { field: 'submittedAt', direction: 'desc' },
                    ])
                ),
              S.divider(),
              S.listItem()
                .title('待处理')
                .child(
                  S.documentTypeList('booking')
                    .title('待处理预约')
                    .filter('_type == "booking" && status == "pending"')
                    .defaultOrdering([
                      { field: 'submittedAt', direction: 'desc' },
                    ])
                ),
              S.listItem()
                .title('已确认')
                .child(
                  S.documentTypeList('booking')
                    .title('已确认预约')
                    .filter('_type == "booking" && status == "confirmed"')
                    .defaultOrdering([
                      { field: 'submittedAt', direction: 'desc' },
                    ])
                ),
              S.listItem()
                .title('已完成')
                .child(
                  S.documentTypeList('booking')
                    .title('已完成预约')
                    .filter('_type == "booking" && status == "completed"')
                    .defaultOrdering([
                      { field: 'submittedAt', direction: 'desc' },
                    ])
                ),
              S.listItem()
                .title('已取消')
                .child(
                  S.documentTypeList('booking')
                    .title('已取消预约')
                    .filter('_type == "booking" && status == "cancelled"')
                    .defaultOrdering([
                      { field: 'submittedAt', direction: 'desc' },
                    ])
                ),
            ])
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) => listItem.getId() !== 'booking'
      ),
    ])
